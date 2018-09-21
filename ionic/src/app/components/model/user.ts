import { Device } from "../../api/api";

export interface User {
    _id: string;
    name: string;
    password: string;
    email: string;
    token: string;
}
export interface importDevices {
    chip_id: string;
    createdAt: string;
    meta: Device;
    updatedAt: string;
    user_id: string;
}
