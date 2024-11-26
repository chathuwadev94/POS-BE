import { IBarcode } from "../interfaces/barcode.interface";

export class ViewBarcodeDto {
    formatDataSet(data: IBarcode) {
        return {
            id: data.id,
            code: data.code || null,
            type: data.type || null,
            item: data.item || null,
            typeName: data.typeName || null
        };
    }
}

export class ViewBarcodeAvailabilityDto {
    formatDataSet(data: any) {
        return {
            availble: data || false
        };
    }
}