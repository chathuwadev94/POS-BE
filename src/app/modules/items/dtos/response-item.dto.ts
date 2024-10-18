import { ApiProperty } from "@nestjs/swagger";
import { IItem } from "../interfaces/item.interface";
import { ICategory } from "../interfaces/category.interface";
import { IBarcode } from "../interfaces/barcode.interface";
import { IStock } from "../../warehouse/interfaces/stock.interface";

export class ResponseItemDto implements IItem {

    @ApiProperty({ type: Number, description: 'Item Id' })
    id: number;

    @ApiProperty({ type: String, description: 'Item Name ' })
    name: string;

    @ApiProperty({ type: String, description: 'Item Description' })
    description: string;

    @ApiProperty({ type: Number, description: 'Item Price' })
    price: number;

    @ApiProperty({ type: Number, description: 'Item  Unit Price' })
    unitPrice: number

    @ApiProperty({ type: Number, description: 'Item Cost' })
    cost: number;

    @ApiProperty({ type: String, description: 'Item Image ' })
    image: string;

    @ApiProperty({ type: String, description: 'Item Manufacture' })
    manufactur: string;

    @ApiProperty({ type: Number, description: 'Item Category ' })
    category: ICategory

    @ApiProperty({ type: Number, description: 'Item Barcode' })
    barcode: IBarcode;

    @ApiProperty({ type: Number, description: 'Item Stock' })
    stock: IStock
}
