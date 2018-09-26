import { Component, OnInit, EventEmitter } from '@angular/core';
import { Platform, MenuController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ApiService } from "../api/api.service";
import { DeviceService } from "../api/device.service"
import { NotifyService } from "../api/notify.service";
import { Ping, Wifi, Device, Switch } from "../api/api"
import { EventHandlerService } from '../api/event-handler.service'
import { Router } from '@angular/router';
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
  errorMessage: string
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
    private notifyService: NotifyService,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.message = "platform ready";
      this.checkExistingDevice();
    });
  }
  async switchOff(s: Switch, d: Device) {
    this.deviceService.sendMessageToSocket({
      type: "device_pin_oper",
      chip: d.chip,
      pin: s.pin,
      status: "LOW",
      name: s.name,
      app_id: await this.deviceService.getAppID(),
      stage: "init"
    })
  }
  async switchOn(s: Switch, d: Device) {
    this.deviceService.sendMessageToSocket({
      type: "device_pin_oper",
      chip: d.chip,
      pin: s.pin,
      status: "HIGH",
      name: s.name,
      app_id: await this.deviceService.getAppID(),
      stage: "init"
    })
  }
  async setSwitchNamee(s: Switch, d: Device) {
    this.deviceService.sendMessageToSocket({
      type: "set_switch_name",
      chip: d.chip,
      pin: s.pin,
      name: s.name,
      app_id: await this.deviceService.getAppID(),
      stage: "init"
    })
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
    this.router.navigate(["/scan-device"]);
  }
  async scanWifi() {
    this.loader = true;
    try {
      const resData = await this.api.getScanWifi();
      this.wifinetworks = resData['data'];
      this.loader = false
      console.log(this.wifinetworks);
    } catch (e) {
      this.loader = false;
      console.log(e)
      this.errorMessage = e['error']
      this.notifyService.alertUser("Can not get Wifi");
      this.isScanningDevice = true;

    }
  }
  async pingDevices() {
    this.devices.forEach(async (device) => {
      console.log("pinging device", device.chip);
      this.deviceService.sendMessageToSocket({
        type: "device_online_check",
        chip: device.chip,
        app_id: await this.deviceService.getAppID(),
        stage: "init"
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
              this.errorMessage = e['error']
              this.notifyService.alertUser("Switch name is not set");
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
            this.deviceService.sendMessageToSocket({
              type: "device_set_add_employee",
              chip: this.devicePing.chip, // this is just temporary code. will remove hard coded chip id with actual device
              app_id: await this.deviceService.getAppID(),
              emp_id: data.emp_id,
              stage: "init"
            })
          }
        }
      ]
    });

    await alert.present();


  }
  async deleteEmployee(device: Device) {

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
            this.deviceService.sendMessageToSocket({
              type: "device_set_delete_employee",
              chip: this.devicePing.chip, // this is just temporary code. will remove hard coded chip id with actual device
              app_id: await this.deviceService.getAppID(),
              emp_id: data.emp_id,
              stage: "init"
            })
          }
        }
      ]
    });

    await alert.present();

  }
  async disableEmployee(device: Device) {
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
            this.deviceService.sendMessageToSocket({
              type: "device_set_disable_employee",
              chip: "xSmart-1602506", // this is just temporary code. will remove hard coded chip id with actual device
              app_id: await this.deviceService.getAppID(),
              emp_id: data.emp_id,
              stage: "init"
            })
          }
        }
      ]
    });

    await alert.present();
  }
  async enableEmployee(device: Device) {
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
            this.deviceService.sendMessageToSocket({
              type: "device_set_enable_employee",
              chip: "xSmart-1602506", // this is just temporary code. will remove hard coded chip id with actual device
              app_id: await this.deviceService.getAppID(),
              emp_id: data.emp_id,
              stage: "init"
            })
          }
        }
      ]
    });
    await alert.present();
  }
}
