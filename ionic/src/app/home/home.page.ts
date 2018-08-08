import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

import { ApiService } from "../api/api.service";
import { Ping, Wifi } from "../api/api"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  message: String = "test";
  xSmartConnect: boolean = false;
  deviceName: string = "";
  wifinetworks: Wifi[] = [];

  constructor(
    private platform: Platform,
    private http: HttpClient,
    private api: ApiService,
    public alertController: AlertController) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.message = "platform ready";
      this.keepCheckingWifiConnected();
    });
  }
  keepCheckingWifiConnected() {
    setInterval(async () => {
      try {
        let response: Ping = await this.api.checkPing();
        this.deviceName = response.ping;
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
