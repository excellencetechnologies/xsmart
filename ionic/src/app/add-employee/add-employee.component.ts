import { Component, OnInit, EventEmitter } from '@angular/core';
import { addEmployee, employeeDetail, punches } from "../components/model/user";
import { DeviceService } from '../api/device.service';
import { ActivatedRoute, Router } from '@angular/router'
import { EventHandlerService } from '../api/event-handler.service';
import { timer } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ModalController, AlertController, PopoverController, } from '@ionic/angular';
import { EmployeePunchComponent } from '../employee-punch/employee-punch.component';
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
  currentdate = new Date();
  employeePunches: any;
  employeetiming: any = [];
  maxDate: any = new Date().getFullYear();
  customPickerOptions;
  employee;
  event;

  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private _event: EventHandlerService,
    private router: Router,
    public apiServices: ApiService,
    public modalController: ModalController,
    public PopoverController: PopoverController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.enrollCard = {
      isenrollCard: false,
      isEmployeeExist: false,
      isEmployeePunches: false
    }
    this.maxDate += 2;
    this.route.params.subscribe(params => (this.deviceId = params.id));
    this.addEmployeeSubscription = this._event.employeeAdd.subscribe(async (res) => {
      this.enrollCard.isenrollCard = false;
      this.router.navigate(["/view-employee"]);
    })
    this.addEmployeefailedSubscription = this._event.employeeAddfailed.subscribe(async (res) => {
      this.enrollCard.isenrollCard = false;
      this.errorMessage = true;
    })
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

  async addEmployee(employee) {
    try {
      this.employeeData = await this.deviceService.getEmployee(employee);
      if (this.employeeData) {
        this.enrollCard.isEmployeeExist = true;
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
      timer(10000).subscribe(() => {
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

  setEmployee(employee, event) {
    this.employee = employee;
    this.event = event;
  }

  async report(date) {
    date = date.day.text + '-' + date.month.text + '-' + date.year.text;
    try {
      const data = await this.apiServices.employeePunch(this.employee.emp_id, date);
      this.employeePunches = data['punches']
      if (this.employeePunches) {
        this.employeePunches.forEach((element) => {
          element.timing = element.timing.split(' ');
          this.employeetiming.push({
            "time": element.timing[1]
          })
        });
        const getDataEmployeePunches = this.employeetiming;
        const modal = await this.PopoverController.create({
          component: EmployeePunchComponent,
          componentProps: getDataEmployeePunches
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
    this.loading=true
    try {
      this.loading=false;
      this.employeeDetail = await this.apiServices.getEmployeeDetail();
    }
    catch (e) {
      this.loading=false;
    }
  }
}

