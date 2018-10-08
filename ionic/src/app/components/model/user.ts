import { Device } from "../../api/api";

export interface User {
    _id: string;
    name: string;
    password: string;
    email: string;
    token: string;
}
export interface newDevice {
    chip_id: string;
    user_id: string;
    meta: Device;
}
export interface deleteDevice {
    chip_id: string;
    user_id: string;
}
export interface employee{
    emp_id:string;
}