import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { DeviceService } from '../api/device.service';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Ping, Wifi, Device, Switch } from "../api/api"
import { Platform } from '@ionic/angular';
import { newDevice } from "../components/model/user";
import { NotifyService } from '../api/notify.service';

@Component({
  selector: 'app-existing-devices',
  templateUrl: './existing-devices.component.html',
  styleUrls: ['./existing-devices.component.scss']
})
export class ExistingDevicesComponent implements OnInit {
  devices: newDevice[];
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
    private deviceService: DeviceService,
    private notifyService: NotifyService,
  ) { }

  ngOnInit() {
    this.getDevice();
  }

  async getDevice() {
    this.loading = true;
    try {
      this.devices = await this.apiServices.listDevices();
      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.notifyService.alertUser(this.errorMessage);
      this.errorMessage = err['error'];
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
    this.router.navigate(["/tabs"]);
  } 
}

