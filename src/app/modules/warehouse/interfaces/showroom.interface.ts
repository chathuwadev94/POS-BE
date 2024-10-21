import { IBaseModel } from "src/app/core/repositories/interface/base.model.interface";
import { IWarehouse } from "./warehouse.interface";
import { IUser } from "../../user/interfaces/user.interface";

export interface IShowroom extends IBaseModel {
    name?: string;
    address?: string;
    warehouseId?: number;
    location?: string;
    warehouse?: IWarehouse;
    users?: IUser[];
}
