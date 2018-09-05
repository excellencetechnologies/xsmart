import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-scan-devices',
  templateUrl: './scan-devices.component.html',
  styleUrls: ['./scan-devices.component.scss']
})
export class ScanDevicesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
 
   pairDevice(){
    this.router.navigate(["/pairDevices"]);
  }
  
}
