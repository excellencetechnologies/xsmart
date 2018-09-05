import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ping, Wifi } from "./api"
import { environment } from "../../environments/environment";
export interface Message {
  author: string,
  message: string
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      token: localStorage.getItem("token")
    })
  };
  // ************************************************************************************************
  base_url: string = "http://192.168.4.1/";
  constructor(private http: HttpClient) { }

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

  async postlogin(data) {
    const apidata = { "email": data.email, "password": data.password };
    try {
      const data = await this.http.post(`${environment["apiBase"]}user/login`, apidata).toPromise();
      localStorage.setItem("token", data['token']);

      return data['data'];
    }
    catch (error) {
      throw (error);
    }
  }
  async postRegister(data) {
    const apidata = { "name": data.name, "email": data.email, "password": data.password };
    try {
      const data = await this.http.post(`${environment["apiBase"]}user/register`, apidata).toPromise();
      return data['data'];
    }
    catch (error) {
      throw (error);
    }
  }
  async deviceList() {
    try {
      const data = await this.http.get(`${environment["apiBase"]}device/listDevice`, this.httpOptions).toPromise();
      return data['devices'];
    }
    catch (error) {
      throw (error);
    }
  }
  async addDevices(body) {
    try {
      const data = await this.http.post(`${environment["apiBase"]}device/addDevice`, body, this.httpOptions).toPromise();    return data['data'];
    }
    catch (error) {
      throw (error);
    }
  }


}

