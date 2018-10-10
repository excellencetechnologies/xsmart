import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventHandlerService {

  @Output() loginData = new EventEmitter();
  @Output() userImage =new EventEmitter();
  @Output() devices =new EventEmitter();
  constructor() { }

  setLoginEvent(loginData) {
    this.loginData.emit(loginData);
  }
  setUserImageEvent(userImage){
    this.userImage.emit(userImage);
  }
  setDevices(devices){
    this.devices.emit(devices);
  }
  
}