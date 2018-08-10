import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';


import { Device } from "./api"

@Injectable({
    providedIn: 'root',
})
export class DeviceService {
    constructor(private nativeStorage: NativeStorage,
        private platform: Platform) {

    }
    async getDevices(): Promise<Device[]> {
        if (this.platform.is("mobile"))
            return await this.nativeStorage.getItem('devices') as Device[]
        else {
            if (localStorage.getItem('devices')) {
                return JSON.parse(localStorage.getItem('devices')) as Device[];
            } else {
                return [];
            }
        }
    }
    async addDevice(device: Device) {
        let devices: Device[] = await this.getDevices();
        devices.push(device);
        if (this.platform.is("mobile")) {
            return await this.nativeStorage.setItem("devices", devices)
        } else {
            return localStorage.setItem('devices', JSON.stringify(devices));
        }
    }
    async deleteDevice(device: Device) { }
}
