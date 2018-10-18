import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventHandlerService {

  @Output() loginData = new EventEmitter();
  @Output() userImage = new EventEmitter();
  @Output() devices = new EventEmitter();
  @Output() employeeAdd = new EventEmitter();
  @Output() employeeAddfailed = new EventEmitter();
  @Output() listEmployee = new EventEmitter();
  @Output() accessCard = new EventEmitter();
  @Output() UUId = new EventEmitter()
  constructor() { }

  setLoginEvent(loginData) {
    this.loginData.emit(loginData);
  }
  setUserImageEvent(userImage) {
    this.userImage.emit(userImage);
  }
  setDevices(devices) {
    this.devices.emit(devices);
  }
  addEmployee(employeeAdd) {
    this.employeeAdd.emit(employeeAdd);
  }
  addEmployeefailed(employeeAddfailed) {
    this.employeeAddfailed.emit(employeeAddfailed);
  }
  employeeList(listEmployee) {
    this.listEmployee.emit(listEmployee);
  }
  UUID(UUId) {
    this.UUId.emit(UUId)
  }
}