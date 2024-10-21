import { ISaleItem } from "../interfaces/sale-item.interface";

export class ViewSaleItemDto {
    formatDataSet(data: ISaleItem) {
        return {
            id: data.id,
            quantity: data.quantity || null,
            unitPrice: data.unitPrice || null,
            totalPrice: data.totalPrice || null,
            sale: data.sale || null,
            item: data.item || null

        };
    }
}