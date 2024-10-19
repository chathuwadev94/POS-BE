import { ApiProperty } from "@nestjs/swagger";

export class CreateSaleItemDto {
    @ApiProperty({
        type: Number,
        description: 'Sale Item Quantity',
        required: true,
    })
    quantity: number;

    @ApiProperty({
        type: Number,
        description: 'Sale Item unit Price',
        required: true,
    })
    unitPrice: number;

    @ApiProperty({
        type: Number,
        description: 'Sale Item total Price',
        required: true,
    })
    totalPrice: number;

    @ApiProperty({
        type: Number,
        description: 'Sale Item Sale Id',
        required: true,
    })
    saleId: number

    @ApiProperty({
        type: Number,
        description: 'Sale Item Number',
        required: true,
    })
    itemId: number
}

export class UpdateSaleItemDto extends CreateSaleItemDto { }