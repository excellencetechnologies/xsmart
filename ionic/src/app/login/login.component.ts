import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../api/api.service";
import { User } from './../components/model/user';
import { Router } from "@angular/router";
import { NativeStorage } from '@ionic-native/native-storage/ngx';
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
  constructor(public apiServices: ApiService,
    private router: Router,
    private nativeStorage: NativeStorage
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
      this.loginForm.reset();
      this.addDevice();
      this.router.navigate(["/tabs"]);

    } catch (err) {
      this.loading = false;
      this.errorMessage = err.message;
    }
  }

  async addDevice() {
    try {
      const deviceId = await this.nativeStorage.getItem('id')
      const res = this.apiServices.addDevices({ 'chip_id': deviceId })
    }
    catch (err) {
    }
  }

}
