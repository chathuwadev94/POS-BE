import { IBaseModel } from "src/app/core/repositories/interface/base.model.interface";
import { IItem } from "./item.interface";

export interface ICategory extends IBaseModel {
    id: number;
    name: string;
    description: string;
    item: IItem[];
}
