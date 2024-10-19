import { IBarcode } from "../interfaces/barcode.interface";

export class ViewBarcodeDto {
    formatDataSet(data: IBarcode) {
        return {
            id: data.id,
            code: data.code,
            type: data.type,
            item: data.item
        };
    }
}