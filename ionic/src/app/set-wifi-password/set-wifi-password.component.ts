import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Ping, Wifi, Device, Switch } from "../api/api"
import { NotifyService } from '../api/notify.service';
import { NavParams, ModalController } from '@ionic/angular';
import { DeviceService } from '../api/device.service';
import { timer } from 'rxjs';
@Component({
  selector: 'app-set-wifi-password',
  templateUrl: './set-wifi-password.component.html',
  styleUrls: ['./set-wifi-password.component.scss']
})
export class SetWifiPasswordComponent implements OnInit {
  wifinetworks: Wifi[] = [];
  passwordForm: FormGroup;
  loading: boolean;
  errorMessage: string;
  progressBarInfo: number = 80;
  isScanningDevice: boolean = false;
  ssid: any;
  progressBar: any;
  public type = 'password';
  public showPass = false;
  constructor(
    private router: Router,
    private api: ApiService,
    private notifyService: NotifyService,
    private navParams: NavParams,
    public modalController: ModalController,
    private deviceService: DeviceService,
  ) { }

  ngOnInit() {
    this.progressBar = {
      isDeviceConnected: false,
      isMessageSent: false,
      isNetworkConnect: false
    }
    this.createLoginForm();
    this.getSsid();
  }
  getSsid() {
    this.ssid = this.navParams.get('ssid')
    this.progressBarInfo = 80;
    this.progressBar.isDeviceConnected = true;
    this.progressBar.isMessageSent = true;
  }
  createLoginForm() {
    this.passwordForm = new FormGroup({
      password: new FormControl("", [
        Validators.required
      ])
    });
  }
  async onSubmit(formData) {
    this.loading = true;
    try {
      this.loading = false;
      await this.api.setWifiPassword(this.ssid.wifi, formData.password);
      this.progressBarInfo = 100;
      this.progressBar.isNetworkConnect = true;
      timer(10000).subscribe(() => {
        this.modalController.dismiss();
        this.modalController.dismiss();
        this.modalController.dismiss();
      });
      this.router.navigate(["/tabs"]);
    } catch (err) {
      this.loading = false;
      this.errorMessage = err['error'];
    }
  }
  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

}
