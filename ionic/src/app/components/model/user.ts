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
export interface addEmployee {
    emp_id: string;
}
export interface employeeList {
    WEBID: string
    chip: string
    data: string
    stage: string
    type: string
}
export interface ValidateHRSystemKey {
    secret_key: string
}
export interface employeeDetail {
    emp_id: number
    gender: string
    id: number
    image: string
    jobtitle: string
    name: string
    status: string
    type: string
}
export interface punches {
    id: number
    timestamp: number
    timing: [string]
    user_id: number
}
export interface employeeMonthlyPunches {
    absent_days: number
    half_days: number
    jobtitle: string
    leave_days: number
    name: string
    non_working_days: number
    present_days: number
    userid:number
    working_days: number
}