import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Ping, Wifi, Device } from "./api"
import { environment } from "../../environments/environment";
import { RequestOptions, Http, Headers } from "@angular/http";
import { User, newDevice, deleteDevice, ValidateHRSystemKey, employeeDetail } from "../components/model/user"
import { isUndefined } from 'util';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
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
  constructor(private http: HttpClient,
    private httpOld: Http,
    private platform: Platform,
    private nativeStorage: NativeStorage,

  ) { }

  async checkPing() {
    // return await this.http.get<Ping>(this.base_url).toPromise();
    try {
      if (await this.isLive()) { //live is not null and true
        return await this.http.get<Ping>(`${environment["live_url"]}`).toPromise();
      } else { //live is not null and false
        return await this.http.get<Ping>(`${environment["deviceUrl"]}`).toPromise();
      }
    }
    catch (error) {
      throw (error);
    }
  }

  async getScanWifi() {
    // return await this.http.get<Wifi[]>(this.base_url + "wifi").toPromise();
    try {
      if (await this.isLive()) {
        return await this.http.get<Wifi[]>(`${environment["live_url"]}wifi`).toPromise();
      } else {
        return await this.http.get<Wifi[]>(`${environment["deviceUrl"]}Wifi`).toPromise();
      }
    }
    catch (error) {
      throw (error);
    }
  }

  async setWifiPassword(ssid, password) {
    // return await this.http.get<Wifi[]>(this.base_url + "wifisave?SSID=" + ssid + "&password=" + password).toPromise();
    try {
      if (await this.isLive()) {
        return await this.http.get<Ping[]>(`${environment["live_url"]}wifisave?ssid=${ssid}&password=${password}`).toPromise();
      } else {
        return await this.http.get<Ping[]>(`${environment["deviceUrl"]}wifisave?ssid=${ssid}&password=${password}`).toPromise();

      }
    }
    catch (error) {
      throw (error);
    }
  }
  async setDeviceNickName(name: String, chip: string) {
    // return await this.http.get<Wifi[]>(this.base_url + "setnickname?name=" + name).toPromise();
    try {
      if (await this.isLive()) {
        return await this.http.get(`${environment["live_url"]}setnickname?name=${name}`).toPromise();
      } else {
        return await this.http.get(`${environment["deviceUrl"]}setnickname?name=${name}&chip=${chip}`).toPromise();
      }
    }
    catch (error) {
      throw (error);
    }
  }

  async postlogin(user: User) {
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
  async postRegister(user: User) {
    const apidata = { "name": user.name, "email": user.email, "password": user.password };
    try {
      return await this.http.post<User>(`${environment["base_url"]}user/register`, apidata).toPromise();

    }
    catch (error) {
      throw (error);
    }
  }

  async listDevices(importDevice?: newDevice) {
    let header = new HttpHeaders().set('token', localStorage.getItem("token"));
    try {
      return await this.http.get<newDevice[]>(`${environment["base_url"]}device/listDevice`,
        {
          headers: header
        }
      ).toPromise();
    }
    catch (error) {
      throw (error);
    }
  }
  type: String;
  async allDevices(devices?: Device) {
    let header = new HttpHeaders().set('token', localStorage.getItem("token"));
    try {
      let response = await this.http.get<Device[]>(`${environment["base_url"]}device/allDevices`,
        {
          headers: header
        }
      ).toPromise();
      let allDevices: Device[] = [];
      response.forEach(element => {
        allDevices.push({
          name: element['meta']["name"],
          device_id: null,
          chip: element['chip_id'],
          ttl: null,
          online: null,
          switches: [],
          type: null
        })
      })
      return allDevices;
    }
    catch (error) {
      throw (error);
    }
  }


  async isLive() {
    if (this.platform.is("mobile")) {
      const isLive = await this.nativeStorage.getItem('live');
      if (isLive != undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      if (localStorage.getItem('live') != undefined && JSON.parse(localStorage.getItem('live'))) {
        return true;
      } else {
        return false;
      }
    }
  }
  async connectSettingToHRSystem(HrSystem: ValidateHRSystemKey) {
    try {
      const data = await this.http.get<ValidateHRSystemKey>(`${environment["base_url"]}card/validateKey/${HrSystem.secret_key}`).toPromise();
      return data;
    }
    catch (error) {
      throw (error);
    }
  }
  async addUserMetaData(secret_key) {
    const userId = localStorage.getItem("userId")
    try {
      const data = await this.http.post(`${environment["base_url"]}user/meta/${userId}`, secret_key).toPromise();
      return data;
    }
    catch (error) {
      throw (error);
    }
  }
  async getUserMetaData() {
    const userId = localStorage.getItem("userId")
    try {
      const data = await this.http.get(`${environment["base_url"]}user/meta/${userId}`).toPromise();
      return data;
    }
    catch (error) {
      throw (error);
    }
  }
  async getEmployeeDetail(employeeDetail?: employeeDetail) {
    const userId = localStorage.getItem("userId")
    try {
      const data = await this.http.get<employeeDetail[]>(`${environment["base_url"]}card/employeeData/${userId}`).toPromise();
      return data;
    }
    catch (error) {
      throw (error);
    }
  }
}

