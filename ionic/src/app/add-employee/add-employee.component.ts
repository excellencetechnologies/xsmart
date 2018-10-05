import { Component, OnInit } from '@angular/core';
import { DeviceService } from "../api/device.service"
import { FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employeeID: FormGroup
  constructor(
    private deviceService: DeviceService,
  ) { }

  ngOnInit() {
  }
  createemployeeId() {
    this.employeeID = new FormGroup({
      password: new FormControl("", [
        Validators.required
      ])
    });
  }
  async setSwitchNamee(d: Device, formData) {
    this.deviceService.sendMessageToSocket({
      type: "device_set_add_employee",
      // chip: device.chip, // this is just temporary code. will remove hard coded chip id with actual device
      app_id: await this.deviceService.getAppID(),
      emp_id: formData.emp_id,
      stage: "init"
    })
  }
}
