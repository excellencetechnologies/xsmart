import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { NotifyService } from '../api/notify.service';
import { Router } from '@angular/router';
import { Wifi } from "../api/api"
import { SetWifiPasswordComponent } from '../set-wifi-password/set-wifi-password.component';
@Component({
  selector: 'app-wifi-network',
  templateUrl: './wifi-network.component.html',
  styleUrls: ['./wifi-network.component.scss']
})
export class WifiNetworkComponent implements OnInit {
  isScanningDevice: boolean = false;
  wifinetworks: Wifi[] = [];
  progressBarInfo: number = 0;
  progressBar: any;
  errorMessage: string;
  constructor(
    private router: Router,
    private notifyService: NotifyService,
    private http: HttpClient,
    private api: ApiService,
    public alertController: AlertController,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.scanWifi();
    this.progressBarInfo = 0;
    this.progressBar = {
      isDeviceConnected: false,
      isMessageSent: false,
      isNetworkConnect: false
    }
  }
  async scanWifi() {
    try {
      const resData = await this.api.getScanWifi();
      this.wifinetworks = resData.sort(function (RSSI1, RSSI2) {
        if (RSSI1['RSSI'] > RSSI2['RSSI']) {
          return -1;
        } else if (RSSI1['RSSI'] < RSSI2['RSSI']) {
          return 1;
        } else {
          return 0;
        }
      });
      this.progressBarInfo = 80;
      this.progressBar.isMessageSent = true;
      this.progressBar.isDeviceConnected = true;
    } catch (e) {
      this.errorMessage = e['error']
      this.notifyService.alertUser("Can not get Wifi");
      this.isScanningDevice = true;

    }
  }
  async askWifiPassword(wifi) {
    const data = { wifi: wifi.SSID };
    const modal1 = await this.modalController.create({
      component: SetWifiPasswordComponent,
      componentProps: { ssid: data }
    });
    return await modal1.present();

  }
}
