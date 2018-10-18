import { Component, OnInit, EventEmitter } from '@angular/core';
import { Platform, MenuController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ApiService } from "../api/api.service";
import { DeviceService } from "../api/device.service"
import { NotifyService } from "../api/notify.service";
import { Ping, Wifi, Device, Switch } from "../api/api"
import { EventHandlerService } from '../api/event-handler.service'
import { Router, NavigationEnd } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { newDevice } from "../components/model/user";

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
  devicePing: Ping;
  devices: Device[] = [];
  mode: String = "device";
  isSocketConnected: boolean = false;
  loader: boolean;
  device: newDevice[];
  errorMessage: string
  live: boolean = false;
  time: any;
  routerSet: any;
  wifiSet: boolean = false;
  deviceSubscription: any;
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
    private router: Router,
    private nativeStorage: NativeStorage,
    private _event: EventHandlerService,
  ) { }

  async ngOnInit() {
    this.platform.ready().then(() => {
      this.message = "platform ready";
      this.checkExistingDevice();
    });
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.checkExistingDevice();
        }
      });
    if (localStorage.getItem('live') != undefined) {
      this.live = JSON.parse(localStorage.getItem("live"))
    }
    else if (this.platform.is("mobile")) {
      const liveStatus = await this.nativeStorage.getItem('live')
      if (liveStatus != undefined)
        this.live = liveStatus;
    }
    this.deviceSubscription = this._event.devices.subscribe(async (res) => {
      this.time = res.deviceTime;
      this.devices = await this.deviceService.getDevices();
      this.devices.forEach(value => {
        if (value.device_id == res.id) {
          const currentDate = new Date(this.time);
          const utcTime = new Date(currentDate.getTime() + (30 * 60 * 1000));
          value['time'] = utcTime;
        }
      });
    })
  }

  async onliveMode() {
    this.live = !this.live;
    if (this.platform.is("mobile")) {
      this.nativeStorage.setItem('live', JSON.stringify(this.live))
    }
    else {
      localStorage.setItem('live', JSON.stringify(this.live));
    }
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
  async set_switch_name(s: Switch, d: Device) {
    this.deviceService.sendMessageToSocket({
      type: "device_set_pin_name",
      chip: d.chip,
      pin: s.pin,
      name: s.name,
      app_id: await this.deviceService.getAppID(),
      stage: "init"
    })
  }
  async deviceTime(d: Device) {
    this.deviceService.sendMessageToSocket({
      type: "device_set_time",
      chip: d.chip,
      app_id: await this.deviceService.getAppID(),
      stage: "init",
    });

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
    this.router.navigate(["/scan-device"]);

  }
  async pingDevices() {
    this.devices.forEach(async (device) => {
      this.deviceService.sendMessageToSocket({
        type: "device_online_check",
        chip: device.chip,
        app_id: await this.deviceService.getAppID(),
        stage: "init",
        userId: await this.deviceService.getuserIdFromLocal(),
      });
    });
  }

  async keepCheckingDeviceOnline() {
    setTimeout(async () => {
      this.pingDevices();
      this.keepCheckingDeviceOnline();
    }, this.isSocketConnected ? 1000 * 60 : 1000);
  }

  async setSwitchName(s: Switch, d: Device) {
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
            try {
              s['name'] = data.name;
              this.deviceService.sendMessageToSocket({
                type: "device_set_pin_name",
                chip: d.chip,
                pin: s.pin,
                name: data.name,
                app_id: await this.deviceService.getAppID(),
                stage: "init"
              })
            } catch (e) {
              this.errorMessage = e['error']
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

  addEmployee(device: Device) {
    this.router.navigate(["/add-employee", device.chip]);
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
          role: 'cancel'
        }, {
          text: 'Ok',
          handler: async (data) => {
            this.deviceService.sendMessageToSocket({
              type: "device_set_delete_employee",
              chip: device.chip,
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

  async deviceName(device: Device) {
    const alert = await this.alertController.create({
      header: 'Enter Device Name',
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
            device['name'] = data.name;
            this.deviceService.sendMessageToSocket({
              type: "device_set_name",
              chip: device.chip,
              name: data.name,
              app_id: await this.deviceService.getAppID(),
              stage: "init"
            });
          }
        }
      ]
    });
    this.keepCheckingDeviceOnline();
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
              chip: device.chip,
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
              chip: device.chip,
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

  wifi1() {
    this.router.navigate(["/scan-device"]);
  }

  async listEmployee(device: Device) {
    this.router.navigate(["/view-employee", device.chip]);
  }
}