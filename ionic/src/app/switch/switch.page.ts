import { Component } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HttpClient } from '@angular/common/http';
import { AlertController, MenuController } from '@ionic/angular';
import { DeviceService } from '../api/device.service';
import { Device } from "../api/api"
import { Ping, Wifi, Switch } from "../api/api"
@Component({
  selector: 'app-about',
  templateUrl: 'switch.page.html',
  styleUrls: ['switch.page.scss']
})
export class switchPage {
  loading: boolean;
  devices: Device[] = [];
  errorMessage: string;
  devicePing: Ping;
  mode: String = "device";
  xSmartConnect: boolean = false;
  isSocketConnected: boolean = false;

  ngOnInit() {
    this.getDevice();
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.getDevice();
        }
      });
  }
  constructor(
    public apiServices: ApiService,
    private router: Router,
    private nativeStorage: NativeStorage,
    private http: HttpClient,
    private api: ApiService,
    public alertController: AlertController,
    private deviceService: DeviceService,
    private menuController: MenuController
  ) { }
  async getDevice() {
    this.loading = true;
    try {
      this.devices = await this.deviceService.getDevices();
      this.loading = false;
      if (this.devices.length > 0) {
        this.keepCheckingDeviceOnline();
      }
    } catch (err) {
      this.loading = false;
      this.errorMessage = err.message;
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
  trackByDevice(device: Device) {
    return device.chip;
  }
  trackBySwitch(s: Switch) {
    return s.pin;
  }
  async keepCheckingDeviceOnline() {
    setTimeout(async () => {
      this.pingDevices();
      this.keepCheckingDeviceOnline();
    }, this.isSocketConnected ? 1000 * 60 : 1000); ////this so high because, when device does a ping, we automatically listen to it
  }
  async checkExistingDevice() {
    this.devices = await this.deviceService.getDevices();
    if (this.devices.length > 0) {
      this.keepCheckingDeviceOnline();
    }
  }
  async pingDevices() {
    this.devices.forEach(async (device) => {
      this.deviceService.sendMessageToSocket({
        type: "device_online_check",
        chip: device.chip,
        app_id: await this.deviceService.getAppID(),
        stage: "init"
      });
    });
  }
  menu() {
    this.menuController.toggle()
  }

}
