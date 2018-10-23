import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import {punches } from "../components/model/user";
@Component({
  selector: 'app-employee-punch',
  templateUrl: './employee-punch.component.html',
  styleUrls: ['./employee-punch.component.scss']
})
export class EmployeePunchComponent implements OnInit {
  employeePunchTime: punches;
  constructor(
    private navParams: NavParams,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.employeeDetail()
  }
  employeeDetail() {
    const data = this.navParams.get('employeePunches')
    this.employeePunchTime = data['employeePunches'];
  }

}
