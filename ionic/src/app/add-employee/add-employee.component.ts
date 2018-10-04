import { Component, OnInit } from '@angular/core';
import { DeviceService } from "../api/device.service"

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  devices: Device[] = [];
  constructor(
    private deviceService: DeviceService,
  ) { }

  ngOnInit() {
  }

}
