import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ping, Wifi } from "./api"

export interface Message {
  author: string,
  message: string
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  base_url: string = "http://192.168.4.1/";
  constructor(private http: HttpClient) {
  
  }

  async checkPing() {
    return await this.http.get<Ping>(this.base_url).toPromise();
  }

  async getScanWifi() {
    return await this.http.get<Wifi[]>(this.base_url + "wifi").toPromise();
  }

  async setWifiPassword(ssid, password) {
    return await this.http.get<Wifi[]>(this.base_url + "wifisave?SSID=" + ssid + "&password=" + password).toPromise();
  }

  async setDeviceNickName(name: String) {
    return await this.http.get<Wifi[]>(this.base_url + "setnickname?name=" + name).toPromise();
  }
}
