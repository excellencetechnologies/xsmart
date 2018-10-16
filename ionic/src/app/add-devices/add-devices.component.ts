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
import { timer } from 'rxjs';
import { WifiNetworkComponent } from '../wifi-network/wifi-network.component';
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
  progressBarInfo: number = 40;
  isScanningDevice: boolean = false;
  mode: String = "device";
  errorMessage: string;
  progressBar: any;
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
    this.progressBar = {
      isDeviceConnected: false,
      isMessageSent: false,
      isNetworkConnect: false
    }
    this.getPingDevice()
    this.createSetNameForm();
  }
  getPingDevice() {
    const devicePingData = this.navParm.get('pingDevice')
    this.devicePing = devicePingData['pingDevice']
    if (this.devicePing) {
      this.progressBarInfo = 40;
      this.progressBar.isDeviceConnected = true;
    }
  }

  createSetNameForm() {
    this.setNameForm = new FormGroup({
      name: new FormControl("", [
        Validators.required
      ])
    });
  }
  async setDeviceName(name: String, chip: string, type: string, formData: newDevice) {
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
        this.deviceService.addDevice(newDevice['meta']);
        this.notifyService.alertUser("Device added Successfully");
        if (newDevice) {
          this.progressBarInfo = 60;
          this.progressBar.isMessageSent = true;
        }
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
        if (newDevice) {
          this.progressBarInfo = 60;
          this.progressBar.isMessageSent = true;
        }
      }
      this.mode = "scan";
      const modal1 = await this.modalController.create({
        component: WifiNetworkComponent,
        componentProps: {}
      });
      return await modal1.present();
    } catch (e) {
      this.errorMessage = e["error"];
      this.notifyService.alertUser("Please Provide valid unique chip ID");
    }
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
