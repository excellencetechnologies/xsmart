import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ping, Wifi, Device, Switch } from "../api/api"
import { NotifyService } from '../api/notify.service';
import { HttpClient } from '@angular/common/http'
import { ApiService } from '../api/api.service';
import { timer } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { AddDevicesComponent } from '../add-devices/add-devices.component';
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
  errorMessage: string;
  constructor(
    private router: Router,
    private api: ApiService,
    public modalController: ModalController,
    private notifyService: NotifyService,
  ) { }

  ngOnInit() {
    this.scanDevice();
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
        this.devicePing=data;
        if(this.devicePing) {
          if (this.devicePing.name && this.devicePing.name.length > 0) {
            this.devicePing.isNew = false;
          } else {
            this.devicePing.isNew = true;
          }
        }
        this.isScanningDevice = false;
        clearInterval(wifiCheckInterval);
        this.mode = "discovery";
        const data2 = { pingDevice: this.devicePing };
        const modal = await this.modalController.create({
          component: AddDevicesComponent,
          componentProps: { pingDevice: data2 }
        });
        return await modal.present();
      } catch (e) {
        console.log(e,"error");
        
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
