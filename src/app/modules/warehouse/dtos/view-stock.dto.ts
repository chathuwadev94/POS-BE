import { IStock } from "../interfaces/stock.interface";

export class ViewStockDto {
    formatDataSet(data: IStock) {
        return {
            id: data.id,
            qty: data.qty,
            warehouse: data.warehouse,
            item: data.item,
            itemId:data.itemId,
            status: data.status,
            unitPrice:data.unitPrice || 0
        };
    }
}