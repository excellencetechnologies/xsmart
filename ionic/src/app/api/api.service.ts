import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Ping, Wifi } from "./api"
import { environment } from "../../environments/environment";
import { RequestOptions, Http, Headers } from "@angular/http";
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
  constructor(private http: HttpClient, private httpOld: Http) { }

  async checkPing() {
    // return await this.http.get<Ping>(this.base_url).toPromise();
    try {
      const data = await this.http.get(`${environment["apiBase"]}deviceSimulator/checkPing?access="access"`).toPromise();
      return data;
    }
    catch (error) {
      throw (error);
    }
  }

  async getScanWifi() {
    // return await this.http.get<Wifi[]>(this.base_url + "wifi").toPromise();
    try {
      const data = await this.http.get(`${environment["apiBase"]}deviceSimulator/scanWifi`).toPromise();
      return data;
    }
    catch (error) {
      throw (error);
    }
  }

  async setWifiPassword(ssid, password) {
    // return await this.http.get<Wifi[]>(this.base_url + "wifisave?SSID=" + ssid + "&password=" + password).toPromise();
    try {
      const data = await this.http.get(`${environment["apiBase"]}deviceSimulator/setWifiPassword/${ssid}/${password}`).toPromise();
      return data;
    }
    catch (error) {
      throw (error);
    }
  }

  async setDeviceNickName(name: String, chip: string) {
    // return await this.http.get<Wifi[]>(this.base_url + "setnickname?name=" + name).toPromise();
    try {
      const data = await this.http.get(`${environment["apiBase"]}deviceSimulator/setDeviceNickName/${name}/${chip}`).toPromise();
      return data;
    }
    catch (error) {
      throw (error);
    }
  }

  async postlogin(user) {

    const apidata = { "email": user.email, "password": user.password };
    try {
      const data = await this.http.post(`${environment["apiBase"]}user/login`, apidata).toPromise();
      localStorage.setItem("token", data['token']);
      localStorage.setItem("username", data["data"].name);
      localStorage.setItem("userId", data["data"]._id);
      return data;
    }
    catch (error) {
      throw (error);
    }
  }
  async postRegister(data) {
    const apidata = { "name": data.name, "email": data.email, "password": data.password };
    try {
      const data = await this.http.post(`${environment["apiBase"]}user/register`, apidata).toPromise();
      return data;
    }
    catch (error) {
      throw (error);
    }
  }
  async addDevices(body) {
    let header = new HttpHeaders().set('token', localStorage.getItem("token"));
    try {
      const data = await this.http.post(`${environment["apiBase"]}device/addDevice`, body,
        {
          headers: header
        }
      ).toPromise();
      return data;
    }
    catch (error) {
      throw (error);
    }
  }
  async listDevices() {
    let header = new HttpHeaders().set('token', localStorage.getItem("token"));
    try {
      const data = await this.http.get(`${environment["apiBase"]}device/listDevice`,
        {
          headers: header
        }
      ).toPromise();
      return data;
    }
    catch (error) {
      throw (error);
    }
  }
  async deleteDevices(body) {
    let header = new Headers();
    header.append('token', localStorage.getItem("token"));
    try {
      const data = await this.httpOld.delete(`${environment["apiBase"]}device/deleteDevice`, new RequestOptions({
        headers: header,
        body: body,
      })).toPromise();
      return data;
    }
    catch (error) {
      throw (error);
    }
  }
}

