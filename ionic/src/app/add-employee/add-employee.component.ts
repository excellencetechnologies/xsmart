import { Component, OnInit } from '@angular/core';
import { employee } from "../components/model/user";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DeviceService } from '../api/device.service';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  deviceId: string;
  loading:boolean;
  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.employeeId()
    this.route.params.subscribe(params => (this.deviceId = params.id));
  }

  employeeId() {
    this.employeeForm = new FormGroup({
      emp_id: new FormControl("", [
        Validators.required
      ])
    });
  }
  async employeeData(formData: employee) {
    this.deviceService.sendMessageToSocket({
      type: "device_set_add_employee",
      chip: this.deviceId,
      app_id: await this.deviceService.getAppID(),
      emp_id: formData.emp_id,
      stage: "init"
    })
    this.loading=true;
  }
}
