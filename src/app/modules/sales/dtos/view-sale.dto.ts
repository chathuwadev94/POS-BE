import { ISale } from "../interfaces/sale.interface";

export class ViewSaleDto {
    formatDataSet(data: ISale) {
        return {
            id: data.id,
            totalAmount: data.totalAmount || 0,
            itemCount: data.itemCount || 0,
            user: data.user || null,
            salesItem: data.saleItems || null

        };
    }
}