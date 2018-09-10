import { Component } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { Device } from './../components/model/device';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage {
  loading: boolean;
  device: Device;
  errorMessage: string;
  ngOnInit() {
    this.getDevice();
  }
  constructor(
    public apiServices: ApiService,
     private router: Router,
     private nativeStorage: NativeStorage
    ) { }
  async getDevice() {
    this.loading = true;
    try {
      this.device = await this.apiServices.deviceList();
      console.log(this.device);
      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.errorMessage = err.message;
    }
  }
  // async deleteDevice(body){
  //   try{
  //     const deviceId = await this.nativeStorage.getItem('id')
  //     this.device=await this.apiServices.deleteDevices({ 'chip_id': deviceId });
  //    }
  //    catch(err){
  //     this.errorMessage = err.message;
  //    }
  // }
  // scanDevice() {
  //   this.router.navigate(["/scanDevices"]);
  // }
//  async deviceSimulator(){
//    try{
//      await this.apiServices. deviceSimulator()
//    }
//    catch(err){
//     this.errorMessage = err.message;
//    }
//  }
  

}
