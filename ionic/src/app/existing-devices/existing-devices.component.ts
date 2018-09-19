import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { DeviceService } from '../api/device.service';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Ping, Wifi, Device, Switch } from "../api/api"
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-existing-devices',
  templateUrl: './existing-devices.component.html',
  styleUrls: ['./existing-devices.component.scss']
})
export class ExistingDevicesComponent implements OnInit {

  devices: Device[] = [];
  loading: boolean;
  errorMessage: string;
  constructor(
    private http: HttpClient,
    private apiServices: ApiService,
    private deviceServices: DeviceService,
    private router: Router,
    private nativeStorage: NativeStorage,
    private platform: Platform,
  ) { }

  ngOnInit() {
    this.getDevice();
  }

  async getDevice() {
    this.loading = true;
    try {
      const allDevices = await this.apiServices.listDevices();
      this.devices = allDevices['devices'];
      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.errorMessage = err.message;
    }
  }
  importDevices() {
    const enableDevices = [];
    this.devices.forEach(device => {
      if (device['status'] && device['meta']) {
        enableDevices.push(device['meta']);
      }
    })
    if (this.platform.is("cordova"))
      this.nativeStorage.setItem('devices', enableDevices)
    else {
      localStorage.setItem("devices", JSON.stringify(enableDevices));
    }
  }
  onSelect(devices): void {
    devices.status = !devices.status;
  }
}

