import { ISale } from "../interfaces/sale.interface";
import { ISaleItemsResponse } from "./response-sale.dto";

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
export class ViewSaleInvoiceResponseDto {
    formatDataSet(data: ISaleItemsResponse) {
        return {
            id: data.id,
            netAmount: data.netAmount || 0,
            itemsCount: data.itemsCount || 0,
            totalQty:data.totalQty || 0,
            saleItems: data.saleItems || null

        };
    }
}