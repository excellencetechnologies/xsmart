import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';

import { ApiService } from "../api/api.service";
import { DeviceService } from "../api/device.service"
import { NotifyService } from "../api/notify.service";
import { Ping, Wifi, Device, Switch } from "../api/api"


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
    private notifyService: NotifyService,
    private toastController: ToastController) { }

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
          this.notifyService.alertUser("operation sent to device");
        } else if (res.type === "device_io_notify") {
          await this.deviceService.updateDevicePin(res.pin, res.status, res.chip);
          this.devices = await this.deviceService.getDevices();
          this.notifyService.alertUser("device performed the action!");
        }else if(res.type === "device_bulk_pin_oper_reply"){
          this.notifyService.alertUser("operation sent to device");
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
      app_id: await this.deviceService.getAppID()
    })
  }
  async switchOn(s: Switch, d: Device) {
    this.sendMessageToSocket({
      type: "device_pin_oper",
      chip: d.chip,
      pin: s.pin,
      status: 1,
      app_id: await this.deviceService.getAppID()
    })
  }
  async deviceBulkIO(d: Device, isChecked: boolean){
    
    let io = [];
    d.switches.forEach((s: Switch) => {
      io.push({
        pin: s.pin,
        status: isChecked ? 1: 0
      })
    })
    this.sendMessageToSocket({
      type: "device_bulk_pin_oper",
      chip: d.chip,
      switches: io,
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
      isNew: false
    }
    this.keepCheckingWifiConnected();
  }
  keepCheckingWifiConnected() {
    if (wifiCheckInterval)
      clearInterval(wifiCheckInterval);
    wifiCheckInterval = setInterval(async () => {
      try {
        this.devicePing = await this.api.checkPing();
        if (this.devicePing.name.length > 0) {
          this.devicePing.isNew = false;
        } else {
          this.devicePing.isNew = true;
        }
        console.log(this.devicePing);
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
  async setDeviceName(name: String) {
    try {
      await this.api.setDeviceNickName(name);
      if (!await this.deviceService.checkDeviceExists(this.devicePing.chip)) {
        let newdevice: Device = {
          name: name,
          device_id: this.devicePing.webid,
          chip: this.devicePing.chip,
          ttl: 0,
          online: false,
          switches: []
        };
        this.deviceService.addDevice(newdevice);
      } else {

        const toast = await this.toastController.create({
          message: 'This device already exists!.',
          duration: 2000
        });
        toast.present();

      }
      this.mode = "scan";
      this.xSmartConnect = true;
      this.scanWifi();
    } catch (e) {
      console.log(e);
      this.notifyService.alertUser("failed to set device name");
    }
  }

  async scanWifi() {
    try {
      this.wifinetworks = await this.api.getScanWifi();
      console.log(this.wifinetworks);
    } catch (e) {
      console.log(e)
      this.isScanningDevice = true;
    }
  }
  async pingDevices() {
    this.devices.forEach(async (device) => {
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
    console.log("123123");
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
}
