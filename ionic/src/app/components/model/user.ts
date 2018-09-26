import { Device } from "../../api/api";

export interface User {
    _id: string;
    name: string;
    password: string;
    email: string;
    token: string;
}
export interface importDevice {
    chip_id: string;
    user_id: string;
    meta:Device;
}

export interface deleteDevice {
    chip_id: string;
    user_id: string;
}