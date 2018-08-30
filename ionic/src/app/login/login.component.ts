import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../api/api.service";
import { userData } from './../components/model/login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  loading: boolean;
  user: userData;
  constructor(public apiServices: ApiService) { }

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
    } catch (err) {
      this.loading = false;
      this.errorMessage = err.message;
    }
  }
}
