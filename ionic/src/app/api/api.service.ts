import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Ping, Wifi } from "./api"
import io from 'socket.io-client';

const socket = io('http://5.9.144.226:9030');

socket.on('connect', function(){
  console.log("connected");
});
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});



@Injectable({
  providedIn: 'root',
})
export class ApiService {

  base_url: string = "http://192.168.4.1/";
  constructor(private http: HttpClient) { }

  async checkPing() {
    return await this.http.get<Ping>(this.base_url).toPromise();
  }

  async getScanWifi(){
    return await this.http.get<Wifi[]>(this.base_url + "wifi").toPromise();
  }

  async setWifiPassword(ssid, password){
    return await this.http.get<Wifi[]>(this.base_url + "wifisave?SSID=" + ssid + "&password=" + password).toPromise();
  }

  async checkDeviceOnline(){

  }
}
