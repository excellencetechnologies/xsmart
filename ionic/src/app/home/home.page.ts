import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

import { ApiService } from "../api/api.service";
import { DeviceService } from "../api/device.service"
import { Ping, Wifi, Device, Switch } from "../api/api"


let socket = null;

let wifiCheckInterval = null;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  message: String = "test";
  xSmartConnect: boolean = false;
  wifinetworks: Wifi[] = [];
  devicePing: Ping;
  devices: Device[] = [];
  isScanningDevice: boolean = false;
  mode: String = "device";
  // mode show in which state the mobile app is 
  // 1. device (i.e it will show list of devices if any)
  // 2. scan ( i.e scan for devices )

  constructor(
    private platform: Platform,
    private http: HttpClient,
    private api: ApiService,
    public alertController: AlertController,
    private deviceService: DeviceService) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.message = "platform ready";
      // this.keepCheckingWifiConnected();
      this.checkExistingDevice();
    });
  }
  sendMessageToSocket(msg) {
    if (socket && socket.readyState === 1) {
      console.log("socket msg send to", msg);
      socket.send(msg);

    } else {
      socket = new WebSocket('ws://5.9.144.226:9030');
      // Connection opened
      socket.addEventListener('open', function (event) {
        // socket.send({"test":'Hello Server!'});
        console.log("socket connected");
        socket.send(msg);
      });

      // Listen for messages
      socket.addEventListener('message', (event) => {
        console.log('Message from server ', event);
        let res = JSON.parse(event.data);
        if (res.type === "device_online_check_reply") {
          this.updateDeviceStatus(res);
        }
      });
    }
  }
  async switchOff(s: Switch, d: Device){
    this.sendMessageToSocket({
      type: "device_pin_oper",
      chip: d.chip,
      pin: s.pin,
      status: 0
    })
  }
  async switchOn(s: Switch, d: Device){
    this.sendMessageToSocket({
      type: "device_pin_oper",
      chip: d.chip,
      pin: s.pin,
      status: 1
    })
  }
  async updateDeviceStatus(data) {
    if (data.found) {
      await this.deviceService.updateDevice(data);
    } else {
      await this.deviceService.updateDeviceNotFound(data);
    }
    this.devices = await this.deviceService.getDevices();
  }
  async checkExistingDevice() {
    this.devices = await this.deviceService.getDevices();
    if (this.devices.length === 0) {

    } else {
      this.keepCheckingDeviceOnline();
    }

  }
  scanDevice() {
    this.mode = "scan";
    this.isScanningDevice = true;
    this.wifinetworks = [];
    this.keepCheckingWifiConnected();
  }
  keepCheckingWifiConnected() {
    wifiCheckInterval = setInterval(async () => {
      try {
        this.devicePing = await this.api.checkPing();
        console.log(this.devicePing);
        this.xSmartConnect = true;
        this.isScanningDevice = false;
        clearInterval(wifiCheckInterval);
        if (!this.deviceService.checkDeviceExists(this.devicePing.chip)) {
          let newdevice: Device = {
            name: "",
            device_id: this.devicePing.webid,
            chip: this.devicePing.chip,
            ttl: 0,
            online: false,
            switches: []
          };
          this.deviceService.addDevice(newdevice);
        }
      } catch (e) {
        console.log(e)
        this.isScanningDevice = true;
        // this.xSmartConnect = false;
      }
    }, 5000)
  }

  async scanWifi() {
    try {
      this.wifinetworks = await this.api.getScanWifi();
      console.log(this.wifinetworks);
    } catch (e) {
      console.log(e)
      this.isScanningDevice = true;
    }
  }
  async keepCheckingDeviceOnline() {
    setInterval(async () => {

      this.devices.forEach((device) => {
        this.sendMessageToSocket(JSON.stringify({
          type: "device_online_check",
          chip: device.chip
        }));
      })

    }, 5000);
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
            console.log('Confirm Ok')
            console.log(data.password);
            console.log(wifi.SSID);
            try {
              await this.api.setWifiPassword(wifi.SSID, data.password);
            } catch (e) { 
              console.log(e);
            }
            this.keepCheckingDeviceOnline();
            this.mode = "device";
          }
        }
      ]
    });

    await alert.present();
  }
}
