import { Component } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
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
  device: Device[] = [];
  errorMessage: string;
  ngOnInit() {
    this.getDevice();
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
      this.device = await this.deviceService.getDevices();
      this.loading = false;
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
    console.log(s.status)

  }
  menu() {
    this.menuController.toggle()
  }

}
