import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "../api/api.service";
import { User } from './../components/model/user';
import { Router } from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userRegisterForm: FormGroup;
  errorMessage: string;
  loading: boolean;
  user: User;
  constructor(
    private _fb: FormBuilder, public apiServices: ApiService, private router: Router
  ) { }

  ngOnInit() {
    this.userRegisterForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onSubmit(formData) {
    this.loading = true;
    try {
      this.user = await this.apiServices.postRegister(formData.value);
      this.loading = false;
      this.router.navigate(["/login"]);
      this.userRegisterForm.reset();
    } catch (err) {
      this.loading = false;
      this.errorMessage = err['error']
    }
  }
}
