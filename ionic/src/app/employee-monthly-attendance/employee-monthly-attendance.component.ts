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
  refEmployeeList;
  searchText: string = '';
  constructor(
    private navParams: NavParams,
    public modalController: ModalController
  ) { }

  ngOnInit() {
   this.getEmployeeDataModel()
  }
  modelClose() {
    this.modalController.dismiss();
  }
  getEmployeeDataModel(){
    const getDataMonthlyPunches = this.navParams;
    delete getDataMonthlyPunches['data']['modal']
    this.employeeMonthlyPunches = Object.values(getDataMonthlyPunches['data']);
    this.refEmployeeList = JSON.parse(JSON.stringify(this.employeeMonthlyPunches));
  }
  filterEmployee(searchText) {
    if (searchText.detail.data && searchText.detail.data.length) {
      this.searchText += searchText.detail.data;
      this.employeeMonthlyPunches = this.refEmployeeList;
      this.employeeMonthlyPunches = this.employeeMonthlyPunches.filter((employee) => {
        return employee.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
      });
    } else {
      this.searchText = '';
      this.employeeMonthlyPunches = this.refEmployeeList;
    }
  }
}
