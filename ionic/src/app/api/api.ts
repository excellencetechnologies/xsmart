export class Ping {
    webid: string;
    chip: string;
    name: string;
    isNew?: boolean;
    type: string;
}

export class Wifi {
    ENC: string;
    RSSI: number;
    SSID: string;
}
export class Switch {
    pin : number;
    status: number; //0 for off and 1 for on
    name:string;
}

export class Device {
    name: String;
    device_id : String;
    chip : String;
    ttl: number;
    online: boolean;
    switches: Switch[];
    type : String; 
}
