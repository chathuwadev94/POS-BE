import { IBaseModel } from "src/app/core/repositories/interface/base.model.interface";
import { ICategory } from "./category.interface";
import { IBarcode } from "./barcode.interface";
import { IStock } from "../../warehouse/interfaces/stock.interface";

export interface IItem extends IBaseModel {
    id?: number;
    name?: string;
    description?: string;
    cost?: number;
    image?: string;
    manufactur?: string;
    category?: ICategory
    barcode?: IBarcode;
    stock?:IStock
}
