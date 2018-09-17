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
  base_url: string = environment['base_url'];
  constructor(private http: HttpClient) { }

  async checkPing() {
    // return await this.http.get<Ping>(this.base_url).toPromise();
    try {
      const data = await this.http.get(`${environment["apiBase"]}deviceSimulator/checkPing`).toPromise();
      return data['data'];
    }
    catch (error) {
      throw (error);
    }
  }

  async getScanWifi() {
    // return await this.http.get<Wifi[]>(this.base_url + "wifi").toPromise();
    try {
      const data = await this.http.get(`${environment["apiBase"]}deviceSimulator/scanWifi`).toPromise();
      return data['data'];
    }
    catch (error) {
      throw (error);
    }
  }

  async setWifiPassword(ssid, password) {
    // return await this.http.get<Wifi[]>(this.base_url + "wifisave?SSID=" + ssid + "&password=" + password).toPromise();
    try {
      const data = await this.http.get(`${environment["apiBase"]}deviceSimulator/setWifiPassword/${ssid}/${password}`).toPromise();
      return data['data'];
    }
    catch (error) {
      throw (error);
    }
  }

  async setDeviceNickName(name: String, chip: string) {
    // return await this.http.get<Wifi[]>(this.base_url + "setnickname?name=" + name).toPromise();
    try {
      const data = await this.http.get(`${environment["apiBase"]}deviceSimulator/setDeviceNickName/${name}/${chip}`).toPromise();
      console.log(data);

      return data['data'];
    }
    catch (error) {
      throw (error);
    }
  }

  async postlogin(data) {
    const apidata = { "email": data.email, "password": data.password };
    try {
      const data = await this.http.post(`${environment["apiBase"]}user/login`, apidata).toPromise();
      localStorage.setItem("token", data['token']);
      localStorage.setItem("username", data["data"].name);
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
      const data = await this.http.post(`${environment["apiBase"]}device/addDevice`, body, this.httpOptions).toPromise();
      return data['data'];
    }
    catch (error) {
      throw (error);
    }
  }
  async listDevices() {
    try {
      const data = await this.http.get(`${environment["apiBase"]}device/listDevice`, this.httpOptions).toPromise();
      return data;
    }
    catch (error) {
      throw (error);
    }
  }
}

