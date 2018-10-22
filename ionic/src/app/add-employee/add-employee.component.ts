import { Component, OnInit, EventEmitter } from '@angular/core';
import { addEmployee, employeeDetail } from "../components/model/user";
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
  deviceId: string;
  loading: boolean = false;
  enrollCard: any;
  addEmployeeSubscription: any;
  addEmployeefailedSubscription: any;
  errorMessage: boolean;
  employeeDetail: employeeDetail[];
  employeeData: employeeDetail;
  employeeNotFound: boolean;
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
      isgetEmployee: false
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
    this.employeesList()
  }

  async addEmployee(employee) {
    try {
      this.employeeData = await this.deviceService.getEmployee(employee);
      if (this.employeeData) {
        this.enrollCard.isgetEmployee = true;
      } else {
        this.employeeNotFound = true;
      }
    }
    catch (e) {
      this.errorMessage = true;
    }
  }
  async employeeFoundSuccessFully() {
    try {
      this.deviceService.sendMessageToSocket({
        type: "device_set_add_employee",
        chip: this.deviceId,
        app_id: await this.deviceService.getAppID(),
        emp_id: this.employeeData.emp_id,
        stage: "init"
      })
      this.enrollCard.isenrollCard = true;
      timer(5000).subscribe(() => {
        if (this.enrollCard.isenrollCard) {
          this.errorMessage = true;
          this.enrollCard.isenrollCard = false;
        }
      });
    }
    catch (e) {
      this.errorMessage = true;
    }
  }
  async employeesList() {
    try {
      this.employeeDetail = await this.apiServices.getEmployeeDetail();
    }
    catch (e) {
    }
  }

}
