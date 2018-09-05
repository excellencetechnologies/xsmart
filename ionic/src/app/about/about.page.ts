import { Component } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage {
  loading: boolean;
  user: any;
  errorMessage: string;
  ngOnInit() {
    this.getDevice();
  }
  constructor(public apiServices: ApiService, private router: Router) { }
  async getDevice() {
    this.loading = true;
    try {
      this.user = await this.apiServices.deviceList();
      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.errorMessage = err.message;
    }
  }
  scanDevice() {
    this.router.navigate(["/scanDevices"]);
  }

}
