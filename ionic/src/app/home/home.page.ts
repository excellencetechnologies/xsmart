import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

import { ApiService } from "../api/api.service";
import { DeviceService } from "../api/device.service"
import { Ping, Wifi, Device } from "../api/api"

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

  constructor(
    private platform: Platform,
    private http: HttpClient,
    private api: ApiService,
    public alertController: AlertController,
    private deviceService: DeviceService) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.message = "platform ready";
      // this.keepCheckingWifiConnected();
      this.checkExistingDevice();
    });
  }
  async checkExistingDevice() {
    this.devices = await this.deviceService.getDevices();
    if(this.devices.length === 0){

    }
    // if (existingDevices.length === 0) {
    // test code
    //   let device: Device = {
    //     name: "xSmart Test",
    //     device_id: "test",
    //     chip: "chip",
    //     ttl: 123123123,
    //     online: false
    //   }
    //   this.deviceService.addDevice(device)
    //   existingDevices = await this.deviceService.getDevices();
    // }

  }
  scanDevice(){
    this.isScanningDevice = true;
    this.keepCheckingWifiConnected();
  }
  keepCheckingWifiConnected() {
    setInterval(async () => {
      try {
        this.devicePing = await this.api.checkPing();
        console.log(this.devicePing);
        this.xSmartConnect = true;
      } catch (e) {
        console.log(e)
        this.xSmartConnect = false;
      }
    }, 5000)
  }

  async scanWifi() {
    try {
      this.wifinetworks = await this.api.getScanWifi();
      console.log(this.wifinetworks);
    } catch (e) {
      console.log(e)
      this.xSmartConnect = false;
    }
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
            await this.api.setWifiPassword(wifi.SSID, data.password);
          }
        }
      ]
    });

    await alert.present();
  }
}
