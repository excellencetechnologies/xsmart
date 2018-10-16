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
export interface getEmployee {
    emp_id: string;
}
export interface employeeList {
    WEBID: "string"
    chip: "string"
    data: "string"
    stage: "string"
    type: "string"
}