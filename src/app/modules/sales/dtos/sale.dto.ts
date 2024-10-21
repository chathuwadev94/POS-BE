import { ApiProperty } from "@nestjs/swagger";
import { ISaleItemDetails, ISaleItemDetailsDto } from "../interfaces/sale.interface";

export class CreateSaleDto {
    @ApiProperty({
        type: String,
        description: 'Sale Date',
        required: true,
    })
    date: Date;

    @ApiProperty({
        type: Number,
        description: 'Sale Total Amount',
        required: true,
    })
    totalAmount: number;

    @ApiProperty({
        type: Number,
        description: 'Sale Item Count',
        required: true,
    })
    itemCount: number;

    @ApiProperty({
        type: ISaleItemDetailsDto,
        description: 'Sale Items List',
        required: true,
    })
    saleItemsList: ISaleItemDetails

    userId: number;

}

export class UpdateSaleDto extends CreateSaleDto { }