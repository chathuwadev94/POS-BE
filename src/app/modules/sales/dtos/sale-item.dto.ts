import { ApiProperty } from "@nestjs/swagger";
import { ISaleItem } from "../interfaces/sale-item.interface";
import { ISale } from "../interfaces/sale.interface";

export class CreateSaleItemDto {
    @ApiProperty({
        type: Number,
        description: 'Sale Item total Price',
        required: true,
    })
    saleItems: ISaleItem[];

    @ApiProperty({
        type: Number,
        description: 'Sale Item Sale Id',
        required: true,
    })
    sale: ISale

}

export class UpdateSaleItemDto extends CreateSaleItemDto { }