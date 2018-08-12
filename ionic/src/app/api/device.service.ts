import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Device } from "./api"
import { forEach } from '@angular/router/src/utils/collection';

@Injectable({
    providedIn: 'root',
})
export class DeviceService {
    constructor(
        private nativeStorage: NativeStorage,
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
    async setDevices(devices) {
        if (this.platform.is("mobile"))
            await this.nativeStorage.setItem('devices', devices);
        else {
            localStorage.setItem('devices', JSON.stringify(devices));

        }
    }
    async updateDeviceNotFound(data) {
        let devices = await this.getDevices();
        devices = devices.map((device: Device) => {
            if (device.chip === data.chip) {
                device.online = false;
            }
            return device;
        })
        this.setDevices(devices);
    }
    async updateDevice(data) {
        let devices = await this.getDevices();
        devices = devices.map((device: Device) => {
            if (device.chip === data.chip) {
                device.ttl = new Date().getTime();
                device.online = true;
            }
            return device;
        })
        this.setDevices(devices);
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
