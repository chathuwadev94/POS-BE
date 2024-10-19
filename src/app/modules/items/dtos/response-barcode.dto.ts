import { ApiProperty } from "@nestjs/swagger";
import { IBarcode } from "../interfaces/barcode.interface";
import { IItem } from "../interfaces/item.interface";
import { BarcodeType } from "../enums/barcode-type.enum";

export class ResponseBarcodeDto implements IBarcode {

    @ApiProperty({ type: Number, description: 'Barcode Id' })
    id: number;

    @ApiProperty({ type: String, description: 'Code' })
    code: string;

    @ApiProperty({ type: Number, enum: BarcodeType, description: 'Barcode type' })
    type: number

    @ApiProperty({ type: Number, description: 'Item' })
    item: IItem
}