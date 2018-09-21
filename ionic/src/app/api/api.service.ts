import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Ping, Wifi } from "./api"
import { environment } from "../../environments/environment";
import { RequestOptions, Http, Headers } from "@angular/http";
import { User, importDevices } from "../components/model/user"
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
      return await this.http.get<Ping>(`${environment["deviceUrl"]}`).toPromise();

    }
    catch (error) {
      throw (error);
    }
  }

  async getScanWifi() {
    // return await this.http.get<Wifi[]>(this.base_url + "wifi").toPromise();
    try {
      return await this.http.get<Wifi[]>(`${environment["deviceUrl"]}Wifi`).toPromise();

    }
    catch (error) {
      throw (error);
    }
  }

  async setWifiPassword(ssid, password) {
    // return await this.http.get<Wifi[]>(this.base_url + "wifisave?SSID=" + ssid + "&password=" + password).toPromise();
    try {
      return await this.http.get<Wifi[]>(`${environment["deviceUrl"]}wifisave?ssid=${ssid}&password=${password}`).toPromise();

    }
    catch (error) {
      throw (error);
    }
  }
  async setDeviceNickName(name: String, chip: string) {
    // return await this.http.get<Wifi[]>(this.base_url + "setnickname?name=" + name).toPromise();
    try {
      return await this.http.get(`${environment["deviceUrl"]}setnickname?name=${name}&chip=${chip}`).toPromise();
    }
    catch (error) {
      throw (error);
    }
  }

  async postlogin(user:User) {
    const apidata = { "email": user.email, "password": user.password };
    try {
      const data = await this.http.post<User>(`${environment["base_url"]}user/login`, apidata).toPromise();
      localStorage.setItem("token", data['token']);
      localStorage.setItem("username", data["name"]);
      localStorage.setItem("userId", data["_id"]);
      return data;
    }
    catch (error) {
      throw (error);
    }
  }
  async postRegister(user:User) {
    const apidata = { "name": user.name, "email": user.email, "password": user.password };
    try {
      return await this.http.post<User>(`${environment["base_url"]}user/register`, apidata).toPromise();

    }
    catch (error) {
      throw (error);
    }
  }
  async addDevices(body) {
    let header = new HttpHeaders().set('token', localStorage.getItem("token"));
    try {
      return await this.http.post(`${environment["base_url"]}device/addDevice`, body,
        {
          headers: header
        }
      ).toPromise();

    }
    catch (error) {
      throw (error);
    }
  }
  async listDevices() {
    let header = new HttpHeaders().set('token', localStorage.getItem("token"));
    try {
      return await this.http.get<importDevices[]>(`${environment["base_url"]}device/listDevice`,
        {
          headers: header
        }
      ).toPromise();
    }
    catch (error) {
      throw (error);
    }
  }
  async deleteDevices(body) {
    let header = new Headers();
    header.append('token', localStorage.getItem("token"));
    try {
      return await this.httpOld.delete(`${environment["base_url"]}device/deleteDevice`, new RequestOptions({
        headers: header,
        body: body,
      })).toPromise();
    }
    catch (error) {
      throw (error);
    }
  }
}

