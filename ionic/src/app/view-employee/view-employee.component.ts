import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DeviceService } from '../api/device.service';
import { ActivatedRoute, Router } from '@angular/router'
import { employeeList, employeeDetail } from "../components/model/user";
import { EventHandlerService } from '../api/event-handler.service';
import { AlertController, PopoverController } from '@ionic/angular';
import { ApiService } from '../api/api.service';
import { EmployeePunchComponent } from '../employee-punch/employee-punch.component';
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
  getEmployee: employeeDetail[];
  employeePunches: any;
  timing: any = [];
  maxDate: any = new Date().getFullYear();
  customPickerOptions;
  employee;
  event;
  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private router: Router,
    private _event: EventHandlerService,
    public alertController: AlertController,
    public apiService: ApiService,
    public PopoverController: PopoverController
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
    this.maxDate += 2;
    this.employeesList();
    this.presentDatePicker();
  }
  presentDatePicker() {
    this.customPickerOptions = {
      buttons: [{
        text: 'save',
        handler: (date) => {
          this.report(date);
        }
      }, {
        text: 'cancel',
        handler: () => {
        }
      }]
    }
  }
  setEmployee(employee, event) {
    this.employee = employee;
    this.event = event;
  }

  async report(date) {
    date = date.day.text + '-' + date.month.text + '-' + date.year.text;
    try {
      const data = await this.apiService.employeePunch(this.employee.emp_id, date);
      this.employeePunches = data['punches']
      if (this.employeePunches) {
        this.employeePunches.forEach((element) => {
          element.timing = element.timing.split(' ');
          this.timing.push({
            "time": element.timing[1]
          })
        });
        const data2 =  this.timing;
        const modal = await this.PopoverController.create({
          component: EmployeePunchComponent,
          componentProps: data2
        });
        return await modal.present();
      }
    
    }
    catch (e) {
      this.presentAlert()
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Message',
      message: 'Employee has not punched .',
      buttons: ['OK']
    });
    await alert.present();
  }
  async employeesList() {
    try {
      this.getEmployee = await this.apiService.getEmployeeDetail();
    }
    catch (e) {
    }
  }

}