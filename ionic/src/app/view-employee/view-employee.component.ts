import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DeviceService } from '../api/device.service';
import { ActivatedRoute, Router } from '@angular/router'
import { employeeList } from "../components/model/user";
import { EventHandlerService } from '../api/event-handler.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {
  deviceId: string;
  employeeForm: FormGroup;
  listEmployeeSubscription: any;
  employees: employeeList;
  employeeList = [];
  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private router: Router,
    private _event: EventHandlerService,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => (this.deviceId = params.id));
    this.listEmployeeSubscription = this._event.listEmployee.subscribe(async (res) => {
      this.employees = (JSON.parse(res.data));
      Object.keys(this.employees).forEach((key) => {
        if (key != 'disabled') {
          this.employeeList.push({
            emp_id: this.employees[key],
            key: key
          })
        }
      });
    })
    this.employeeData();
  }

  async employeeData() {
    this.deviceService.sendMessageToSocket({
      type: "device_set_list_employee",
      chip: this.deviceId,
      app_id: await this.deviceService.getAppID(),
      stage: "init"
    })
  }
}