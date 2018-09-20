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
      const data = await this.apiServices.postlogin(formData.value);
      this.user = data['data']
      this.loading = false;
      this._event.setLoginEvent(this.user.name)
      this.loginForm.reset();
      this.router.navigate(["/existing-devices"]);
    } catch (err) {
      this.loading = false;
      this.errorMessage = err['error'].message;
    }
  }
}
