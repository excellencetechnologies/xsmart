import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { punches } from "../components/model/user";
import { DeviceService } from '../api/device.service';
@Component({
  selector: 'app-employee-punch',
  templateUrl: './employee-punch.component.html',
  styleUrls: ['./employee-punch.component.scss']
})
export class EmployeePunchComponent implements OnInit {
  employeePunchTime: any;
  constructor(
    private navParams: NavParams,
    public modalController: ModalController,
    public deviceService: DeviceService
  ) { }

  ngOnInit() {
    const getDataEmployeePunchTime = this.navParams;
    delete getDataEmployeePunchTime['data']['popover']
    this.employeePunchTime = Object.values(getDataEmployeePunchTime['data']);
  }
}
