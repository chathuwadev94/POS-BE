import { IBaseModel } from "src/app/core/repositories/interface/base.model.interface";
import { IWarehouse } from "./warehouse.interface";
import { IItem } from "../../items/interfaces/item.interface";

export interface IStock extends IBaseModel {
    id?: number;
    qty?: number;
    warehouseId?: number;
    itemId?: number;
    status?: number;
    warehouse?: IWarehouse;
    item?:IItem;
    unitPrice: number;
}
