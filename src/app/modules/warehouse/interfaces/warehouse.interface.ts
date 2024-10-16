import { IBaseModel } from "src/app/core/repositories/interface/base.model.interface";
import { IStock } from "./stock.interface";

export interface IWarehouse extends IBaseModel {

    id: number;
    name: string;
    location: string;
    address: string;
    capacity: number;
    stocks: IStock[];

}
