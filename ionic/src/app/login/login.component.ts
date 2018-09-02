import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../api/api.service";
import { User } from './../components/model/user';
import { Router } from "@angular/router";
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
  constructor(public apiServices: ApiService,private router: Router) { }

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
      this.router.navigate(["/tabs"]);
    } catch (err) {
      this.loading = false;
      this.errorMessage = err.message;
    }
  }
}
