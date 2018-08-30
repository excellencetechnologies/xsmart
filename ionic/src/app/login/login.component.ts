import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../api/api.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm: FormGroup;
errorMessage:string;
loading: boolean;
  constructor(public apiServices: ApiService) { }

  ngOnInit() {
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
      ]),
      password: new FormControl("", [
        Validators.required
      ])
    });
  }
  onSubmit(formData) {
 this.loading=true;
   this.apiServices.postlogin(formData.value).then(res=>{
     this.loading=false;
    this.loginForm.reset();
   })
   .catch(err=>{
     this.loading=false;
    this.errorMessage = err.message;
   })
  }
}
