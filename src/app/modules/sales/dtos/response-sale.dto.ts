import { ISaleItem } from "../interfaces/sale-item.interface";

export class SaleResponseDto {

}

export interface ISaleItemsResponse {
    id:number
    netAmount: number;
    itemsCount:number;
    totalQty:number;
    saleItems: ISaleItem[];
}