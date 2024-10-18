import { ApiProperty } from "@nestjs/swagger";

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
        description: 'Item Price',
        required: true,
    })
    price: number;

    @ApiProperty({
        type: Number,
        description: 'Item unit Price',
        required: true,
    })
    unitPrice: number

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
    categoryId: number
}


export class UpdateItemDto extends CreateItemDto {

}