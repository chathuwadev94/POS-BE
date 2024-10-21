import { IBaseModel } from "src/app/core/repositories/interface/base.model.interface";
import { IItem } from "../../items/interfaces/item.interface";
import { IUser } from "../../user/interfaces/user.interface";
import { ISaleItem } from "./sale-item.interface";

export interface ISale extends IBaseModel {
    date?: Date;
    totalAmount?: number;
    itemCount?: number;
    user?: IUser
    saleItems?: ISaleItem[];
}

export interface ISaleItemDetails {
    itemId: number;
    qty: number;
    stockId:number;
}

export class ISaleItemDetailsDto {
    itemId: number;
    qty: number;
    stockId:number;
}
