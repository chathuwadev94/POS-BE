import { ApiProperty } from "@nestjs/swagger";
import { ISaleItemDetails, ISaleItemDetailsDto } from "../interfaces/sale.interface";

export class CreateSaleDto {

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
    saleItemsList: ISaleItemDetails[]

}

export class UpdateSaleDto extends CreateSaleDto { }