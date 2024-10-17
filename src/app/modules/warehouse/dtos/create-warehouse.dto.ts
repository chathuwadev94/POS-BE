import { ApiProperty } from "@nestjs/swagger";

export class CreateWarehouseDto {
    @ApiProperty({
        type: String,
        description: 'Name of the warehouse',
        required: true,
    })
    name: string

    @ApiProperty({
        type: String,
        description: 'Location of the warehouse',
        required: true,
    })
    location: string

    @ApiProperty({
        type: String,
        description: 'Address of the warehouse',
        required: true,
    })
    address: string

    @ApiProperty({
        type: Number,
        description: 'Capacity of the warehouse',
        required: true,
    })
    capacity: number
}

export class UpdateWarehouseDto extends CreateWarehouseDto {}