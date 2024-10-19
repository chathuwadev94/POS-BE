import { IBaseModel } from "src/app/core/repositories/interface/base.model.interface";
import { ISale } from "../../sales/interfaces/sale.interface";

export interface IUser extends IBaseModel {
    firstName: string;
    lastName?: string;
    nic: string;
    gender: string;
    email?: string;
    address: string;
    userName?: string;
    roles?: string[];
    password?: string;
    status?: number;
    sales?: ISale[];
}
