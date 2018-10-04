import { Component, OnInit } from '@angular/core';
import { Ping, Wifi, Device, Switch } from "../api/api"
import { Router } from '@angular/router';
import { NotifyService } from '../api/notify.service';
import { MenuController, AlertController, Platform, ModalController, NavParams } from '@ionic/angular';
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
  errorMessage: string;
  loader: boolean;
  constructor(
    private router: Router,
    private notifyService: NotifyService,
    private http: HttpClient,
    private api: ApiService,
    private deviceService: DeviceService,
    public alertController: AlertController,
    public modalController: ModalController,
    private navParm: NavParams
  ) { }

  ngOnInit() {
    this.getPingDevice()
    this.createSetNameForm()
    this.scanWifi()
  }
  getPingDevice() {
    const devicePingData = this.navParm.get('pingDevice')
    this.devicePing = devicePingData['pingDevice']
  }

  createSetNameForm() {
    this.setNameForm = new FormGroup({
      name: new FormControl("", [
        Validators.required
      ])
    });
  }
  async setDeviceName(name: String, chip: string, type: string,formData:newDevice) {
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
          type: this.devicePing.type
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
      this.router.navigate(["/add-devices"]);
      this.mode = "scan";
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
      this.wifinetworks = resData.sort(function (RSSI1, RSSI2) {
        if (RSSI1['RSSI'] > RSSI2['RSSI']) {
          return -1;
        } else if (RSSI1['RSSI'] < RSSI2['RSSI']) {
          return 1;
        } else {
          return 0;
        }
      });
      this.loader = false
      this.keepCheckingDeviceOnline() 
    } catch (e) {
      this.loader = false;
      this.errorMessage = e['error']
      this.notifyService.alertUser("Can not get Wifi");
      this.isScanningDevice = true;

    }
  }
  async keepCheckingDeviceOnline() {
    setTimeout(async () => {
      this.pingDevices();
      this.keepCheckingDeviceOnline();
    }, this.deviceService.isSocketConnected ? 1000 * 60 : 1000); ////this so high because, when device does a ping, we automatically listen to it
  }
  async askWifiPassword(wifi) {
    const data = { wifi: wifi.SSID };
    const modal1 = await this.modalController.create({
      component: SetWifiPasswordComponent,
      componentProps: { ssid: data }
    });
    return await modal1.present();

  }
  async pingDevices() {
    this.devices.forEach(async (device) => {
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
