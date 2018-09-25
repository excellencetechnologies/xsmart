import { Component, OnInit } from '@angular/core';
import { Ping, Wifi, Device, Switch } from "../api/api"
import { Router } from '@angular/router';
import { NotifyService } from '../api/notify.service';
import { MenuController, AlertController, Platform } from '@ionic/angular';
import { DeviceService } from '../api/device.service';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
let wifiCheckInterval = null;
@Component({
  selector: 'app-add-devices',
  templateUrl: './add-devices.component.html',
  styleUrls: ['./add-devices.component.scss']
})
export class AddDevicesComponent implements OnInit {
  wifinetworks: Wifi[] = [];
  devices: Device[] = [];
  devicePing: Ping;
  isScanningDevice: boolean = false;
  mode: String = "device";
  canSetDevice: Boolean;
  errorMessage: string
  constructor(
    private router: Router,
    private notifyService: NotifyService,
    private http: HttpClient,
    private api: ApiService,
    private deviceService: DeviceService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.scanDevice();
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
    this.router.navigate(["/add-devices"]);
  }
  keepCheckingWifiConnected() {
    if (wifiCheckInterval)
      clearInterval(wifiCheckInterval);
    wifiCheckInterval = setInterval(async () => {
      try {
        const data = await this.api.checkPing();
        this.devicePing = data['data']
        if (this.devicePing.name.length > 0) {
          this.devicePing.isNew = false;
        } else {
          this.devicePing.isNew = true;
        }
        this.isScanningDevice = false;
        clearInterval(wifiCheckInterval);
        this.mode = "discovery";
      } catch (e) {
        console.log(e)
        this.isScanningDevice = true;
        this.errorMessage = e["error"];
        this.notifyService.alertUser("Device not found");
      }
    }, 5000);
  }
  async setDeviceName(name: String, chip: string) {
    try {
      await this.api.setDeviceNickName(name, chip);
      let newDevice = {
        chip_id: this.devicePing.chip,
        user_id: localStorage.getItem("userId"),
        meta: {
          name: name,
          device_id: this.devicePing.webid,
          chip: this.devicePing.chip,
          ttl: 0,
          online: false,
          switches: [],
          type: ''
        }
      };
      if (!await this.deviceService.checkDeviceExists(this.devicePing.chip)) {
        await this.api.addDevices(newDevice);
        this.deviceService.addDevice(newDevice['meta']);
        this.notifyService.alertUser("Device added Successfully");
      } else {
        this.deviceService.updateDevice(newDevice['meta']);
        const deviceData = await this.deviceService.getDevices();
        deviceData.forEach((value, key) => {
          if (value.chip === this.devicePing.chip) {
            deviceData.splice(key, 1)
            deviceData.push(newDevice['meta']);
          }
        })
        this.deviceService.setDevices(deviceData)
        this.notifyService.alertUser("Device Update Successfully");
      }
      this.canSetDevice = false;
      this.router.navigate(["/add-devices"]);
      this.mode = "scan";
      // this.xSmartConnect = true;
      this.scanWifi();
    } catch (e) {
      this.errorMessage = e["error"];
      this.notifyService.alertUser("Please Provide valid unique chip ID");

    }
  }

  async scanWifi() {
    // this.loader = true;
    try {
      const resData = await this.api.getScanWifi();
      this.wifinetworks = resData['data'];
      // this.loader = false
      console.log(this.wifinetworks);
    } catch (e) {
      // this.loader = false;
      console.log(e)
      this.errorMessage = e['error']
      this.notifyService.alertUser("Can not get Wifi");
      this.isScanningDevice = true;

    }
  }

  triggerSetDevice() {
    this.canSetDevice = true;
  }

  async keepCheckingDeviceOnline() {
    setTimeout(async () => {
      // this.pingDevices();
      console.log(this.deviceService.isSocketConnected);
      this.keepCheckingDeviceOnline();
    }, this.deviceService.isSocketConnected ? 1000 * 60 : 1000); ////this so high because, when device does a ping, we automatically listen to it
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
            try {
              await this.api.setWifiPassword(wifi.SSID, data.password);
            } catch (e) {
              this.errorMessage = e['error']
              this.notifyService.alertUser("Please provide valid password");
              console.log(e);
            }
            this.keepCheckingDeviceOnline();
            this.mode = "device";
            this.router.navigate(["/tabs"]);
          }
        }
      ]
    });

    await alert.present();
  }
}
