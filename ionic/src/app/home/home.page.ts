import { Component, OnInit, EventEmitter } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ApiService } from "../api/api.service";
import { DeviceService } from "../api/device.service"
import { NotifyService } from "../api/notify.service";
import { Ping, Wifi, Device, Switch } from "../api/api"
import { EventHandlerService } from '../api/event-handler.service'
let socket = null;

let wifiCheckInterval = null;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  message: String = "test";
  xSmartConnect: boolean = false;
  wifinetworks: Wifi[] = [];
  devicePing: Ping;
  devices: Device[] = [];
  isScanningDevice: boolean = false;
  mode: String = "device";
  isSocketConnected: boolean = false;
  loader: boolean;
  errorMessage:string
  // mode show in which state the mobile app is 
  // 1. device (i.e it will show list of devices if any)
  // 2. scan ( i.e scan for devices )
  // 3. discovery ( i.e new device found )

  constructor(
    private platform: Platform,
    private http: HttpClient,
    private api: ApiService,
    public alertController: AlertController,
    private deviceService: DeviceService,
    private menuController: MenuController,
    private notifyService: NotifyService) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.message = "platform ready";
      this.checkExistingDevice();
    });
  }
  sendMessageToSocket(msg) {

    if (this.isSocketConnected) {
      console.log("socket msg send to", msg);
      socket.send(JSON.stringify(msg));

    } else {
      // 5.9.144.226:9030
      // http://192.168.1.114:9030/
      socket = new WebSocket('ws://5.9.144.226:9030');
      // Connection opened
      socket.addEventListener('open', (event) => {
        console.log("socket connected");
        this.isSocketConnected = true;
        socket.send(JSON.stringify(msg));
      });

      socket.addEventListener('close', () => {
        console.log("socket closed");
        this.isSocketConnected = false;
      });

      // Listen for messages
      socket.addEventListener('message', async (event) => {

        let res = JSON.parse(event.data);
        console.log('Message from server ');
        console.log(res);
        if (res.type === "device_online_check_reply") {
          this.updateDeviceStatus(res);
        } else if (res.type === "device_pin_oper_reply") {
          if (res.found) {
            this.notifyService.alertUser("operation sent to device");
          } else {
            this.notifyService.alertUser("unable to reach device. device not online");
          }
        } else if (res.type === "device_bulk_io_notify") {
          res.pins.forEach(async (p) => {
            await this.deviceService.updateDevicePin(p.pin, p.status, res.chip, res.name);
          })
          //this is not working. the ui doesn't update all the pin status
          this.devices = await this.deviceService.getDevices();
          this.notifyService.alertUser("device performed the action!");
        } else if (res.type === "device_io_notify") {
          await this.deviceService.updateDevicePin(res.pin, res.status, res.chip, res.name);
          this.devices = await this.deviceService.getDevices();
          this.notifyService.alertUser("device performed the action!");
        } else if (res.type === "device_bulk_pin_oper_reply") {
          if (res.found) {
            this.notifyService.alertUser("operation sent to device");
          } else {
            this.notifyService.alertUser("unable to reach device. device not online");
          }
        }
        else if (res.type === "device_online_check_reply") {
          this.notifyService.alertUser("name sent to device");
        }
      });
    }
  }

  async switchOff(s: Switch, d: Device) {
    this.sendMessageToSocket({
      type: "device_pin_oper",
      chip: d.chip,
      pin: s.pin,
      status: 0,
      name: s.name,
      app_id: await this.deviceService.getAppID()
    })
  }
  async switchOn(s: Switch, d: Device) {
    this.sendMessageToSocket({
      type: "device_pin_oper",
      chip: d.chip,
      pin: s.pin,
      status: 1,
      name: s.name,
      app_id: await this.deviceService.getAppID()
    })
  }
  async setSwitchNamee(s: Switch, d: Device) {
    this.sendMessageToSocket({
      type: "set_switch_name",
      chip: d.chip,
      pin: s.pin,
      name: s.name,
      app_id: await this.deviceService.getAppID()
    })
  }

  async updateDeviceStatus(data) {
    if (data.found) {
      await this.deviceService.updateDevice(data);
    } else {
      await this.deviceService.updateDeviceNotFound(data);
    }
    this.devices = await this.deviceService.getDevices();
  }
  async checkExistingDevice() {
    this.devices = await this.deviceService.getDevices();
    if (this.devices.length > 0) {
      console.log(this.devices);

      this.keepCheckingDeviceOnline();
    }
  }
  trackByDevice(device: Device) {
    return device.chip;
  }
  trackBySwitch(s: Switch) {
    return s.pin;
  }
  async deleteDevice(device: Device) {
    this.deviceService.deleteDevice(device);
    this.checkExistingDevice();
  }
  scanDevice() {
    this.mode = "scan";
    this.isScanningDevice = true;
    this.wifinetworks = [];
    this.devicePing = {
      name: "",
      chip: "",
      webid: "",
      isNew: false,
      type: ""
    }
    this.keepCheckingWifiConnected();
  }
  keepCheckingWifiConnected() {
    if (wifiCheckInterval)
      clearInterval(wifiCheckInterval);
    wifiCheckInterval = setInterval(async () => {
      try {
        const data = await this.api.checkPing();
        this.devicePing = data['data']
        if (this.devicePing.name.length > 0) {
          this.devicePing.isNew = false;
        } else {
          this.devicePing.isNew = true;
        }
        this.isScanningDevice = false;
        clearInterval(wifiCheckInterval);
        this.mode = "discovery";
      } catch (e) {
        console.log(e)
        this.isScanningDevice = true;
        // this.xSmartConnect = false;
      }
    }, 1000);
  }
  async freshDevice() {
    this.devicePing.name = "";
    this.devicePing.isNew = true;
  }
  async askDeviceName() {

  }
  async setDeviceName(name: String, chip: string) {
    try {
      await this.api.setDeviceNickName(name, chip);
      let newDevice = {
        chip_id: this.devicePing.chip,
        user_id: localStorage.getItem("userId"),
        meta: {
          name: name,
          device_id: this.devicePing.webid,
          chip: this.devicePing.chip,
          ttl: 0,
          online: false,
          switches: [],
          type: ''
        }
      };
      if (!await this.deviceService.checkDeviceExists(this.devicePing.chip)) {
        await this.api.addDevices(newDevice);
        this.deviceService.addDevice(newDevice['meta']);
      } else {
        this.deviceService.updateDevice(newDevice['meta']);
        const deviceData = await this.deviceService.getDevices();
        deviceData.forEach((value, key) => {
          if (value.chip === this.devicePing.chip) {
            deviceData.splice(key, 1)
            deviceData.push(newDevice['meta']);
          }
        })
        this.deviceService.setDevices(deviceData)
      }
      this.checkExistingDevice();
      this.mode = "scan";
      this.xSmartConnect = true;
      this.scanWifi();
    } catch (e) {
      this.errorMessage = e["error"];
      this.notifyService.alertUser("failed to set device name");
    }
  }


  async scanWifi() {
    this.loader = true;
    try {
     this. wifinetworks = await this.api.getScanWifi(); 
      this.loader = false
      console.log(this.wifinetworks);
    } catch (e) {
      this.loader = false;
      console.log(e)
      this.errorMessage=e['error']
      this.isScanningDevice = true;

    }
  }
  async pingDevices() {
    this.devices.forEach(async (device) => {
      console.log("pinging device", device.chip);
      this.sendMessageToSocket({
        type: "device_online_check",
        chip: device.chip,
        app_id: await this.deviceService.getAppID()
      });
    });
  }

  async keepCheckingDeviceOnline() {
    setTimeout(async () => {
      this.pingDevices();
      console.log(this.isSocketConnected);
      this.keepCheckingDeviceOnline();
    }, this.isSocketConnected ? 1000 * 60 : 1000); ////this so high because, when device does a ping, we automatically listen to it
  }
  async askWifiPassword(wifi) {
    const alert = await this.alertController.create({
      header: 'Enter Wifi Password',
      inputs: [
        {
          name: 'password',
          type: 'text',
        }
      ],


      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: async (data) => {
            console.log('Confirm Ok')
            console.log(data.password);
            console.log(wifi.SSID);
            try {
              await this.api.setWifiPassword(wifi.SSID, data.password);
            } catch (e) {
              this.errorMessage=e['error']
              console.log(e);
            }
            this.keepCheckingDeviceOnline();
            this.mode = "device";
            this.checkExistingDevice();
          }
        }
      ]
    });

    await alert.present();
  }
  async setSwitchName(s, d) {
    const alert = await this.alertController.create({
      header: 'Enter Switch Name',
      inputs: [
        {
          name: 'name',
          type: 'text',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: async (data) => {
            console.log('Confirm Ok')
            try {
              s['name'] = data.name;
              d.switches.forEach(value => {
                if (value.pin === s.pin) {
                  value = s;
                }
              })
              this.setSwitchNamee(s, d);
              const allDevices = await this.deviceService.getDevices();
              allDevices.forEach(value => {
                if (value['chip'] === d['chip']) {
                  value.switches.forEach((value1, key) => {
                    if (value1.pin == s.pin) {
                      value1.name = data.name
                    }
                  })
                }
              })
              this.deviceService.setDevices(allDevices);
            } catch (e) {
              this.errorMessage=e['error']
              console.log(e);
            }
            this.keepCheckingDeviceOnline();
            this.mode = "device";
          }
        }
      ]
    });

    await alert.present();
  }
  menu() {
    this.menuController.toggle()
  }
  /** 
   * new test code by manish for access card
   */

  async addEmployee(device: Device) {

    const alert = await this.alertController.create({
      header: 'Enter Employee ID',
      inputs: [
        {
          name: 'emp_id',
          type: 'text',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: async (data) => {
            this.sendMessageToSocket({
              type: "device_set_add_employee",
              chip: device.chip,
              app_id: await this.deviceService.getAppID(),
              emp_id: data.emp_id
            })
          }
        }
      ]
    });

    await alert.present();


  }
}
