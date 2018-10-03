import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-scan-device',
  templateUrl: './scan-device.component.html',
  styleUrls: ['./scan-device.component.scss']
})
export class ScanDeviceComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }
  next() {
    this.router.navigate(["/pair-device"]);
  }

}
