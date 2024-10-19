import { IBaseModel } from "src/app/core/repositories/interface/base.model.interface";
import { ISale } from "./sale.interface";
import { IItem } from "../../items/interfaces/item.interface";

export interface ISaleItem extends IBaseModel {
    quantity?: number;
    unitPrice?: number;
    totalPrice?: number;
    sale?: ISale
    item?: IItem
}
