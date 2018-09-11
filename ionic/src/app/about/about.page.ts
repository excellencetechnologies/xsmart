import { Component } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HttpClient } from '@angular/common/http';
import { AlertController, MenuController } from '@ionic/angular';
import { DeviceService } from '../api/device.service';
import {  Device } from "../api/api"
@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage {
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
     private menuController:MenuController
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
  menu() {
    this.menuController.toggle()
  }  

}
