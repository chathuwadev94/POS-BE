import { ApiProperty } from "@nestjs/swagger";

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


    userId: number;

}

export class UpdateSaleDto extends CreateSaleDto { }