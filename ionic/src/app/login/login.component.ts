import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../api/api.service";
import { User } from './../components/model/user';
import { Router } from "@angular/router";
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EventHandlerService } from '../api/event-handler.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  loading: boolean;
  user: User;
  constructor(
    public apiServices: ApiService,
    private router: Router,
    private nativeStorage: NativeStorage,
    private _event: EventHandlerService,
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
      ]),
      password: new FormControl("", [
        Validators.required
      ])
    });
  }
  async onSubmit(formData) {
    this.loading = true;
    try {
      this.user = await this.apiServices.postlogin(formData.value);
      this.loading = false;
      this._event.setLoginEvent(this.user.name)
      this.loginForm.reset();
      await this.addDevice();
      this.router.navigate(["/existing-devices"]);
    } catch (err) {
      this.loading = false;
      this.errorMessage = err['error'].message;
    }
  }

  async addDevice() {
    try {
      let body = {};
      body['chip_id'] = "123456"
      body['meta'] = {
        "name": "Access Control",
        "device_id": "1234",
        "chip": "devicePing",
        "ttl": "0",
        "switches": [],
        "type": "access"
      }
      body['deviceId'] = await this.nativeStorage.getItem('id')
      body['userId'] = localStorage.getItem("userId")
      console.log("body")
      await this.apiServices.addDevices(body);
      return;
    }

    catch (err) {
    }
  }

}
