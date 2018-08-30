import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
        Validators.minLength(8)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }
  onSubmit(formData) {
   console.log(formData.value);
   
  }

}
