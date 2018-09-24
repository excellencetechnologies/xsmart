import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
@Component({
  selector: 'app-set-wifi-password',
  templateUrl: './set-wifi-password.component.html',
  styleUrls: ['./set-wifi-password.component.scss']
})
export class SetWifiPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  loading:boolean;
  errorMessage:string;
  constructor( private router: Router) { }

  ngOnInit() {
    this.createLoginForm();
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
      this.router.navigate([""]);
    } catch (err) {
      this.loading = false;
      this.errorMessage = err['error'];
    }
  }
}
