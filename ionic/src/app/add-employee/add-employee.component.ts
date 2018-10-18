import { Component, OnInit, EventEmitter } from '@angular/core';
import { employee, employeeDetail } from "../components/model/user";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DeviceService } from '../api/device.service';
import { ActivatedRoute, Router } from '@angular/router'
import { EventHandlerService } from '../api/event-handler.service';
import { timer } from 'rxjs';
import { ApiService } from '../api/api.service';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  deviceId: string;
  loading: boolean = false;
  enrollCard: any;
  addEmployeeSubscription: any;
  addEmployeefailedSubscription: any;
  errorMessage: boolean;
  employeeDetail: employeeDetail[];
  employeeData: employeeDetail;
  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private _event: EventHandlerService,
    private router: Router,
    public apiServices: ApiService
  ) { }

  ngOnInit() {
    this.enrollCard = {
      isenrollCard: false,
    }
    this.route.params.subscribe(params => (this.deviceId = params.id));
    this.addEmployeeSubscription = this._event.employeeAdd.subscribe(async (res) => {
      this.enrollCard.isenrollCard = false;
      this.router.navigate(["/view-employee"]);
    })
    this.addEmployeefailedSubscription = this._event.employeeAddfailed.subscribe(async (res) => {
      this.enrollCard.isenrollCard = false;
      this.errorMessage = true;
    })
    this.employees()
  }
  async employees() {
    try {
      this.employeeForm = new FormGroup({
        emp_id: new FormControl("", [
          Validators.required
        ])
      });
      this.employeeDetail = await this.apiServices.getEmployeeDetail();
    }
    catch (e) {

    }
  }
  async addEmployee(formData: employee) {
    this.deviceService.sendMessageToSocket({
      type: "device_set_add_employee",
      chip: this.deviceId,
      app_id: await this.deviceService.getAppID(),
      emp_id: formData.emp_id,
      stage: "init"
    })
    this.employeeDetail.filter((employeeDetail: employeeDetail) => {
      if (employeeDetail.emp_id == formData.emp_id) {
        this.employeeData = employeeDetail
        return;
      }
    })
    this.errorMessage = false;
    this.enrollCard.isenrollCard = true;
    timer(5000).subscribe(() => {
      if (this.enrollCard.isenrollCard) {
        this.errorMessage = true;
        this.enrollCard.isenrollCard = false;
      }
    });
  }

}
