import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ping, Wifi } from "./api"
import { environment } from "../../environments/environment";
import { loginData } from './../components/model/login';

export interface Message {
  author: string,
  message: string
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiData: loginData;
  token: string;

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

  postlogin(post) {
    const apidata = { "email": post.email, "password": post.password };

    return new Promise((resolve, reject) => {
      this.http
        .post(`${environment["apiBase"]}user/login`, apidata)
        .subscribe(data => {
          if (data["error"] && data["error"] === 1) {
            reject(data);
          } else {
            this.token = data["data"].token;
            localStorage.setItem("token", JSON.stringify(this.token));
            resolve(data);
          }
        });
    });
  }

}

