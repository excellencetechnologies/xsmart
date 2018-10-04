import { Component, OnInit } from '@angular/core';
import { DeviceService } from "../api/device.service"

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  constructor(
    private deviceService: DeviceService,
  ) { }

  ngOnInit() {
  }
  async setSwitchNamee(d: Device) {
    this.deviceService.sendMessageToSocket({
      type: "device_set_add_employee",
      chip: "xSmart-1602506", // this is just temporary code. will remove hard coded chip id with actual device
      app_id: await this.deviceService.getAppID(),
      // emp_id: data.emp_id,
      // stage: "init
    })
  }
}
