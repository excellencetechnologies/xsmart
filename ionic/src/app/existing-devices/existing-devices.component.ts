import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { DeviceService } from '../api/device.service';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-existing-devices',
  templateUrl: './existing-devices.component.html',
  styleUrls: ['./existing-devices.component.scss']
})
export class ExistingDevicesComponent implements OnInit {
  listDevices: Array<any>;
  loading: boolean;
  errorMessage: string;
  constructor(
    private http: HttpClient, 
    private apiServices: ApiService,
    private deviceServices:DeviceService,
    private router: Router,
    private nativeStorage: NativeStorage,
  ) { }

  ngOnInit() {
    this.getDevice();
  } 
  async getDevice() {
    this.loading = true;
    try {
      const allDevices = await this.apiServices.listDevices();
      this.listDevices = allDevices['devices'];
      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.errorMessage = err.message;
    }
  }
 importDevices(){
    // JSON.parse(localStorage.getItem('listDevices'));
    localStorage.setItem("listDevices",JSON.stringify(this.listDevices)); 
  }
}
