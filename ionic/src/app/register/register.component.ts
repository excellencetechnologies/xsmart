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
      email: ['', Validators.compose([Validators.maxLength(50),])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      conpassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    }, { validator: this.pwdMatchValidator.bind(this) });
  }

  pwdMatchValidator(userRegisterForm: FormGroup) {
    return userRegisterForm.get("password").value === userRegisterForm.get("conpassword").value
      ? null : { mismatch: true };
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
      this.errorMessage = err['error'].message;
    }
  }
}
