import { IBaseModel } from "src/app/core/repositories/interface/base.model.interface";
import { IItem } from "./item.interface";

export interface IBarcode extends IBaseModel {
    id?: number;
    code?: string;
    type?: number;
    item?: IItem;
}
