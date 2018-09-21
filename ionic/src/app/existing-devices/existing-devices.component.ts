import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { DeviceService } from '../api/device.service';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Ping, Wifi, Device, Switch } from "../api/api"
import { Platform } from '@ionic/angular';
import { allDevices } from "../components/model/user";

@Component({
  selector: 'app-existing-devices',
  templateUrl: './existing-devices.component.html',
  styleUrls: ['./existing-devices.component.scss']
})
export class ExistingDevicesComponent implements OnInit {
  alldevices;
  device: Device[] = [];
  loading: boolean;
  errorMessage: string;
  constructor(
    private http: HttpClient,
    private apiServices: ApiService,
    private deviceServices: DeviceService,
    private router: Router,
    private nativeStorage: NativeStorage,
    private platform: Platform,
    private deviceService:DeviceService
  ) { }

  ngOnInit() {
    this.getDevice();
  }

  async getDevice() {
    this.loading = true;
    try {
      this.alldevices = await this.apiServices.listDevices();
      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.errorMessage = err.message;
    }
  }
  importDevices() {
    const enableDevices = [];
    this.alldevices.forEach(device => {
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
  async deleteDevices(user_id,chip_id,device:Device) {
    this.loading = true;
    try {
      this.alldevices = await this.apiServices.deleteDevices({ chip_id: chip_id, user_id: user_id });
      this.getDevice()
      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.errorMessage = err.message;
    }
  }

}

