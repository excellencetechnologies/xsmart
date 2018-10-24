import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import {employeeMonthlyPunches } from "../components/model/user";
@Component({
  selector: 'app-employee-monthly-attendance',
  templateUrl: './employee-monthly-attendance.component.html',
  styleUrls: ['./employee-monthly-attendance.component.scss']
})
export class EmployeeMonthlyAttendanceComponent implements OnInit {
  employeeMonthlyPunches: employeeMonthlyPunches;
  constructor(
    private navParams: NavParams,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.employeeMonthlyDetail()
  }
  employeeMonthlyDetail() {
    const data = this.navParams.get('employeeMonthlyPunches')
    this.employeeMonthlyPunches = data['employeeMonthlyPunches'];
  }
  modelClose() {
    this.modalController.dismiss();
  }
}
