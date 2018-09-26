import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Ping, Wifi, Device, Switch } from "../api/api"
import { NotifyService } from '../api/notify.service';
import { NavParams, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-set-wifi-password',
  templateUrl: './set-wifi-password.component.html',
  styleUrls: ['./set-wifi-password.component.scss']
})
export class SetWifiPasswordComponent implements OnInit {
  wifinetworks: Wifi[] = [];
  passwordForm: FormGroup;
  loading:boolean;
  errorMessage:string;
  loader:boolean;
  isScanningDevice: boolean = false;
  ssid:any;
  constructor( 
    private router: Router,
    private api:ApiService,
    private notifyService: NotifyService,
    private navParams: NavParams,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.createLoginForm();
   this.getSsid();
  }
  getSsid(){
   this.ssid= this.navParams.get('ssid')
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
      this.passwordForm.reset();
      await this.api.setWifiPassword(this.ssid.wifi,formData.password);
      const modal = await this.modalController.dismiss();
      this.router.navigate(["/tabs"]);
    } catch (err) {
      this.loading = false;
      this.errorMessage = err['error'];
    }
  }


}
