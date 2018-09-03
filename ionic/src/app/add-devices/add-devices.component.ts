import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-devices',
  templateUrl: './add-devices.component.html',
  styleUrls: ['./add-devices.component.scss']
})
export class AddDevicesComponent implements OnInit {

  [x: string]: any;
  constructor() { }

  ngOnInit() {
  }
  backClicked() {
    this._location.back();
   }
}
