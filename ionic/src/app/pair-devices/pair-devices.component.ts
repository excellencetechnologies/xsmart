import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-pair-devices',
  templateUrl: './pair-devices.component.html',
  styleUrls: ['./pair-devices.component.scss']
})
export class PairDevicesComponent implements OnInit {

  constructor(private router: Router , private _location: Location) { }

  ngOnInit() {
  }
  backClicked() {
    this._location.back();
   }
  addDevices(){
    this.router.navigate(["/addDevices"]);
  }
}
