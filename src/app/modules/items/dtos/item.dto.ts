import { ApiProperty } from "@nestjs/swagger";
import { ICategory } from "../interfaces/category.interface";
import { IBarcode } from "../interfaces/barcode.interface";

export class CreateItemDto {
    @ApiProperty({
        type: String,
        description: 'Item Name',
        required: true,
    })
    name: string;

    @ApiProperty({
        type: String,
        description: 'Item Description',
        required: true,
    })
    description: string;

    @ApiProperty({
        type: Number,
        description: 'Item Cost',
    })
    cost: number;

    @ApiProperty({
        type: String,
        description: 'Item Image',
        required: true,
    })
    image: string;

    @ApiProperty({
        type: Number,
        description: 'Category Id',
        required: true,
    })
    categoryId?: number;

    @ApiProperty({
        type: Number,
        description: 'Barcode Id',
        required: true,
    })
    barcodeId?: number;

    @ApiProperty({
        type: String,
        description: 'Item Manufacture',
        required: true,
    })
    manufactur?: string;
}


export class UpdateItemDto extends CreateItemDto {
    category?: ICategory;
    barcode?: IBarcode
}