import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { employeeMonthlyPunches } from "../components/model/user";
@Component({
  selector: 'app-employee-monthly-attendance',
  templateUrl: './employee-monthly-attendance.component.html',
  styleUrls: ['./employee-monthly-attendance.component.scss']
})
export class EmployeeMonthlyAttendanceComponent implements OnInit {
  employeeMonthlyPunches: any;

  constructor(
    private navParams: NavParams,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    const getDataMonthlyPunches = this.navParams;
    delete getDataMonthlyPunches['data']['modal']
    this.employeeMonthlyPunches = Object.values(getDataMonthlyPunches['data']);
  }
  modelClose() {
    this.modalController.dismiss();
  }
}
