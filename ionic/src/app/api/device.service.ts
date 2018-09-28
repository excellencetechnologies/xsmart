import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Injectable } from '@angular/core';
import { Platform, Img, ToastController } from '@ionic/angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
// import { Device, Switch ,ping} from "./api"
import { Ping, Wifi, Device, Switch } from "../api/api"
import { stat } from 'fs';
import { NotifyService } from './notify.service';
import { ApiService } from './api.service';
let wifiCheckInterval = null;
let socket = null;
@Injectable({
    providedIn: 'root',
})
export class DeviceService {
    devicePing: Ping;
    isScanningDevice: boolean = false;
    isSocketConnected: boolean = false;
    mode: String = "device";
    constructor(
        private nativeStorage: NativeStorage,
        private platform: Platform,
        private uniqueDeviceID: UniqueDeviceID,
        private toastCtrl: ToastController,
        private notifyService: NotifyService,
        private api: ApiService
    ) {
    }
    //random id to identify the current app
    async getAppID() {
        if (this.platform.is("cordova")) {
            return await this.uniqueDeviceID.get()
        } else {
            return await Promise.resolve("!23");;
        }
    }
    async getDevices(): Promise<Device[]> {
        if (this.platform.is("mobile"))
            return await this.nativeStorage.getItem('devices') as Device[];
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
        if (this.platform.is("mobile")) {
            await this.nativeStorage.setItem('devices', devices);
        } else {
            localStorage.setItem('devices', JSON.stringify(devices));
        }
    }
    async updateDevicePin(pin: number, status: number, chip: string, name: string) {
        let devices = await this.getDevices();
        devices = devices.map((device: Device) => {
            if (device.chip === chip) {
                device.switches = device.switches.map((s: Switch) => {
                    if (s.pin === pin) {
                        s.status = status,
                            s.name = name;
                    }
                    return s;
                })
            }
            return device;
        })
        this.setDevices(devices);
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
                if (device.ttl < new Date().getTime() - 1 * 60 * 1000) {
                    device.online = false;
                } else {
                    device.online = true;
                }
                device.switches = [];
                data.pins.forEach((pin: Switch) => {
                    let swtich: Switch = {
                        "status": pin.status,
                        "pin": pin.pin,
                        "name": pin.name
                    }
                    device.switches.push(swtich);

                })

            }
            return device;
        })
        await this.setDevices(devices);
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
    async deleteDevice(deleteDevice: Device) {
        let devices = await this.getDevices();
        devices = devices.filter((device: Device) => {
            if (device.chip === deleteDevice.chip) {
                return false;
            }
            return true;
        })
        this.setDevices(devices);
    }
    sendMessageToSocket(msg) {

        if (this.isSocketConnected) {
            socket.send(JSON.stringify(msg));

        } else {
            // 5.9.144.226:9030
            // http://192.168.1.114:9030/
            socket = new WebSocket('ws://5.9.144.226:9030');
            // Connection opened
            socket.addEventListener('open', (event) => {
                console.log("socket connected");
                this.isSocketConnected = true;
                socket.send(JSON.stringify(msg));
            });

            socket.addEventListener('close', () => {
                console.log("socket closed");
                this.isSocketConnected = false;
            });
            // Listen for messages
            socket.addEventListener('message', async (event) => {

                let res = JSON.parse(event.data);
                if (res.type === "device_online_check_reply") {
                    this.updateDeviceStatus(res);
                } else if (res.type === "device_pin_oper_reply") {
                    if (res.found) {
                        this.notifyService.alertUser("operation sent to device");
                    } else {
                        this.notifyService.alertUser("unable to reach device. device not online");
                    }
                } else if (res.type === "device_bulk_io_notify") {
                    res.pins.forEach(async (p) => {
                        this.updateDevicePin(p.pin, p.status, res.chip, res.name);
                    })
                    //this is not working. the ui doesn't update all the pin status
                    await this.getDevices();
                    this.notifyService.alertUser("device performed the action!");
                } else if (res.type === "device_io_notify") {
                    await this.updateDevicePin(res.pin, res.status, res.chip, res.name);
                    await this.getDevices();
                    this.notifyService.alertUser("device performed the action!");
                } else if (res.type === "device_bulk_pin_oper_reply") {
                    if (res.found) {
                        this.notifyService.alertUser("operation sent to device");
                    } else {
                        this.notifyService.alertUser("unable to reach device. device not online");
                    }
                } else if (res.type === "device_bulk_pin_oper_notify") {
                    res.pins.forEach(async (p) => {
                        await this.updateDevicePin(p.pin, p.status, res.chip, res.name);
                    })
                    //this is not working. the ui doesn't update all the pin status
                    await this.getDevices();
                    this.notifyService.alertUser("device performed the action!");
                } else if (res.type === "device_set_add_employee_reply") {
                    if (res.found) {
                        this.notifyService.alertUser("operation sent to device");
                    } else {
                        this.notifyService.alertUser("unable to reach device. device not online");
                    }
                } else if (res.type === "device_set_add_employee_notify") {
                    if (res.stage === "employee_add_failed") {
                        this.notifyService.alertUser("employee add failed on device. reason: " + res.message);
                    } else if (res.stage === "employee_add_success") {
                        this.notifyService.alertUser("device added card successful with card id ." + res.rfid + " and employee id " + res.emp_id);
                    } else {
                        this.notifyService.alertUser("device waiting to add employee. touch card.");
                    }
                } else if (res.type === "device_set_delete_employee_reply") {
                    if (res.found) {
                        this.notifyService.alertUser("operation sent to device");
                    } else {
                        this.notifyService.alertUser("unable to reach device. device not online");
                    }
                } else if (res.type === "device_set_delete_employee_notify") {
                    this.notifyService.alertUser("employee delete");
                } else if (res.type === "device_set_disable_employee_reply") {
                    if (res.found) {
                        this.notifyService.alertUser("operation sent to device");
                    } else {
                        this.notifyService.alertUser("unable to reach device. device not online");
                    }
                } else if (res.type === "device_set_disable_employee_notify") {
                    this.notifyService.alertUser("employee disable");
                } else if (res.type === "device_set_enable_employee_reply") {
                    if (res.found) {
                        this.notifyService.alertUser("operation sent to device");
                    } else {
                        this.notifyService.alertUser("unable to reach device. device not online");
                    }
                } else if (res.type === "device_set_enable_employee_notify") {
                    this.notifyService.alertUser("employee enabled");
                }
                else if (res.type === "device_set_list_employee_reply") {
                    if (res.found) {
                        this.notifyService.alertUser("operation sent to device");
                    } else {
                        this.notifyService.alertUser("unable to reach device. device not online");
                    }
                } else if (res.type === "device_set_list_employee_notify") {
                    this.notifyService.alertUser("employee list recieved");
                } else if (res.type === "device_set_time_reply") {
                    if (res.found) {
                        this.notifyService.alertUser("operation sent to device");
                    } else {
                        this.notifyService.alertUser("unable to reach device. device not online");
                    }
                } else if (res.type === "device_set_time_notify") {
                    this.notifyService.alertUser("device time recieved");
                } else if (res.type === "device_get_time_reply") {
                    if (res.found) {
                        this.notifyService.alertUser("operation sent to device");
                    } else {
                        this.notifyService.alertUser("unable to reach device. device not online");
                    }
                } else if (res.type == "device_set_name") {
                    if (res.found) {
                        this.notifyService.alertUser("device name recived")
                    }
                    else {
                        this.notifyService.alertUser("unable to reach device name");
                    }
                }
                else if (res.type === "device_get_time_notify") {
                    let deviceTime = new Date(res.data).getTime();
                    let currentTime = new Date().getTime();
                    let diff = currentTime - deviceTime;
                    if (Math.abs(diff) > 24 * 60 * 60 * 1000) {
                    } else if (Math.abs(diff) < .5 * 60 * 60 * 1000) {
                    } else {
                        this.sendMessageToSocket({
                            type: "device_set_time",
                            chip: res.chip,
                            app_id: await this.getAppID(),
                            stage: "init",
                            diff: Math.round(diff / 1000)
                        });
                    }
                    this.notifyService.alertUser("device time recieved");
                }
            });
        }
    }

    async updateDeviceStatus(data) {
        try {
            if (data.found) {
                await this.updateDevice(data);
            } else {
                await this.updateDeviceNotFound(data);
            }
            this.getDevices();
        }
        catch (e) {
            this.notifyService.alertUser("device not found");
        }
    }
    keepCheckingWifiConnected() {
        if (wifiCheckInterval)
            clearInterval(wifiCheckInterval);
        wifiCheckInterval = setInterval(async () => {
            try {
                const data = await this.api.checkPing();
                this.devicePing = data['data']
                if (this.devicePing.name.length > 0) {
                    this.devicePing.isNew = false;
                } else {
                    this.devicePing.isNew = true;
                }
                this.isScanningDevice = false;
                clearInterval(wifiCheckInterval);
                this.mode = "discovery";
            } catch (e) {
                this.isScanningDevice = true;
                this.notifyService.alertUser("Device not found");
            }
        }, 5000);
    }
}
