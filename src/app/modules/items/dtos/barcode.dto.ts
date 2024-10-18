import { ApiProperty } from "@nestjs/swagger";
import { BarcodeType } from "../enums/barcode-type.enum";

export class CreateBarcodeDto {
    @ApiProperty({
        type:String,
        description: 'Unique barcode number',
        required: true,
    })
    code:string;

    @ApiProperty({
        type:Number,
        enum:BarcodeType,
        description: 'Barcode Type',
        required: true,
    })
    type:number;

    @ApiProperty({
        type:Number,
        description: 'Item Id',
        required: true,
    })
    itemId:number;


}

export class UpdateBarcodeDto extends CreateBarcodeDto {
    
}