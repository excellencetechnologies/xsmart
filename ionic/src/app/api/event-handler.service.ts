import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventHandlerService {

  @Output() loginData = new EventEmitter();
  @Output() userImage =new EventEmitter();

  constructor() { }

  setLoginEvent(loginData) {
    this.loginData.emit(loginData);
  }
  setUserImageEvent(userImage){
    this.userImage.emit(userImage);
  }
}