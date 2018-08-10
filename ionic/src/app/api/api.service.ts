import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Ping, Wifi } from "./api"
import io from 'socket.io-client';

const socket = io('http://5.9.144.226:9030');

socket.on('connect', function(){
  console.log("connected");
});
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});


export interface Message {
  author: string,
  message: string
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  public messages: Subject<Message>;


  base_url: string = "http://192.168.4.1/";
  constructor(private http: HttpClient,
    wsService: WebsocketService) {
    this.messages = <Subject<Message>>wsService
      .connect(WS_URL)
      .map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message
        }
      });
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

  async checkDeviceOnline() {

  }
}
