import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ping, Wifi, Device, Switch } from "../api/api"
import { NotifyService } from '../api/notify.service';
import { HttpClient } from '@angular/common/http'
import { ApiService } from '../api/api.service';
import { timer } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { WifiNetworkComponent } from '../wifi-network/wifi-network.component';
let wifiCheckInterval = null;
@Component({
  selector: 'app-pair-device',
  templateUrl: './pair-device.component.html',
  styleUrls: ['./pair-device.component.scss']
})
export class PairDeviceComponent implements OnInit {
  wifinetworks: Wifi[] = [];
  devices: Device[] = [];
  devicePing: Ping;
  isScanningDevice: boolean = false;
  mode: String = "device";
  loader: boolean = true;
  errorMessage: string;
  progressBar: any;
  constructor(
    private router: Router,
    private api: ApiService,
    public modalController: ModalController,
    private notifyService: NotifyService,
  ) { }

  ngOnInit() {
    this.scanDevice();
    this.progressBar = {
      isDeviceConnected: false,
      isMessageSent: false,
      isNetworkConnect: false
    }
  }
  addDevice() {
    this.router.navigate(["/add-devices"]);
  }
  keepCheckingWifiConnected() {
    if (wifiCheckInterval)
      clearInterval(wifiCheckInterval);
    wifiCheckInterval = setInterval(async () => {
      try {
        const data = await this.api.checkPing();
        this.loader = false;
        this.devicePing = data;
        if (this.devicePing) {
          if (this.devicePing.name && this.devicePing.name.length > 0) {
            this.devicePing.isNew = false;
          } else {
            this.devicePing.isNew = true;
          }
        }
        this.isScanningDevice = false;
        this.progressBar.isDeviceConnected = true;
        clearInterval(wifiCheckInterval);
        this.mode = "discovery";
        const data2 = { pingDevice: this.devicePing };
        const modal = await this.modalController.create({
          component: WifiNetworkComponent,
          componentProps: { pingDevice: data2 }
        });
        return await modal.present();
      } catch (e) {
        this.isScanningDevice = true;
        this.errorMessage = e;
      }
    }, 5000);
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

}
