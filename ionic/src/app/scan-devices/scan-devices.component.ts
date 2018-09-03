import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-scan-devices',
  templateUrl: './scan-devices.component.html',
  styleUrls: ['./scan-devices.component.scss']
})
export class ScanDevicesComponent implements OnInit {

  constructor(private _location: Location,private router: Router) { }

  ngOnInit() {
  }
  backClicked() {
    this._location.back();
   }
   pairDevice(){
    this.router.navigate(["/pairDevices"]);
  }
}
