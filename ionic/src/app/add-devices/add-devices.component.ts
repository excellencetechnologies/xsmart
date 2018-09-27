import { Component, OnInit } from '@angular/core';
import { Ping, Wifi, Device, Switch } from "../api/api"
import { Router } from '@angular/router';
import { NotifyService } from '../api/notify.service';
import { MenuController, AlertController, Platform, ModalController } from '@ionic/angular';
import { DeviceService } from '../api/device.service';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { newDevice } from '../components/model/user';
import { SetWifiPasswordComponent } from '../set-wifi-password/set-wifi-password.component';

let wifiCheckInterval = null;
@Component({
  selector: 'app-add-devices',
  templateUrl: './add-devices.component.html',
  styleUrls: ['./add-devices.component.scss']
})
export class AddDevicesComponent implements OnInit {
  setNameForm: FormGroup;
  wifinetworks: Wifi[] = [];
  devices: Device[] = [];
  devicePing: Ping;
  isScanningDevice: boolean = false;
  mode: String = "device";
  canSetDevice: Boolean;
  errorMessage: string;
  loader: boolean;
  constructor(
    private router: Router,
    private notifyService: NotifyService,
    private http: HttpClient,
    private api: ApiService,
    private deviceService: DeviceService,
    public alertController: AlertController,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.scanDevice();
  }
  createLoginForm() {
    this.setNameForm = new FormGroup({
      name: new FormControl("", [
        Validators.required,
      ]),
    });
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
  async setDeviceName(name: String, chip: string, formData) {
    try {
      await this.api.setDeviceNickName(name, chip);
      let newDevice: newDevice = {
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
        this.keepCheckingDeviceOnline();
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
    this.loader = true;
    try {
      const resData = await this.api.getScanWifi();
      this.wifinetworks = resData['data'].sort(function (RSSI1,RSSI2) {
        if (RSSI1['RSSI'] > RSSI2['RSSI']) {
          return -1;
        } else if (RSSI1['RSSI'] < RSSI2['RSSI']) {
          return 1;
        } else {
          return 0;
        }
      });
      this.loader = false
    } catch (e) {
      this.loader = false;
      console.log(e)
      this.errorMessage = e['error']
      this.notifyService.alertUser("Can not get Wifi");
      this.isScanningDevice = true;

    }
  }

  SetName() {
    this.canSetDevice = true;
    this.createLoginForm()
  }

  async keepCheckingDeviceOnline() {
    setTimeout(async () => {
      this.pingDevices();
      console.log(this.deviceService.isSocketConnected);
      this.keepCheckingDeviceOnline();
    }, this.deviceService.isSocketConnected ? 1000 * 60 : 1000); ////this so high because, when device does a ping, we automatically listen to it
  }
  async askWifiPassword(wifi) {
    const data = { wifi: wifi.SSID };
    const modal = await this.modalController.create({
      component: SetWifiPasswordComponent,
      componentProps: { ssid: data }
    });
    return await modal.present();
  }
  async pingDevices() {
    this.devices.forEach(async (device) => {
      console.log("pinging device", device.chip);
      this.deviceService.sendMessageToSocket({
        type: "device_online_check",
        chip: device.chip,
        app_id: await this.deviceService.getAppID(),
        stage: "init"
      });
    });
  }
  async freshDevice() {
    this.devicePing.name = "";
    this.devicePing.isNew = true;
  }
}
