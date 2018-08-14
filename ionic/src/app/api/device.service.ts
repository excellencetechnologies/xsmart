import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Device, Switch } from "./api"

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
    async checkDeviceExists(chipid: String) {
        let devices = await this.getDevices();
        let device: Device = devices.find((device: Device) => {
            if (device.chip === chipid) {
                return true;
            }
            return false;
        });
        return device;
    }
    async setDevices(devices: Device[]) {
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
                let offset = new Date().getTimezoneOffset() * 60 * 1000;
                device.ttl = data.time * 1 + offset * -1;
                device.online = true;
                device.switches = [];
                data.pins.forEach((pin: Switch) => {
                    let swtich: Switch = {
                        "status": pin.status,
                        "pin": pin.pin
                    }
                    device.switches.push(swtich);
                })

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
