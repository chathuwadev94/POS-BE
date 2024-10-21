import { ApiProperty } from "@nestjs/swagger";

export class CreateShowroom {
    @ApiProperty({
        type: String,
        description: 'Name of Showroom',
        required: true,
    })
    name: string;

    @ApiProperty({
        type: String,
        description: 'Addres of Showroom',
        required: true,
    })
    address: string;

    @ApiProperty({
        type: Number,
        description: 'Warehouse Id of Showroom',
        required: true,
    })
    warehouseId: number;

    @ApiProperty({
        type: String,
        description: 'Location of Showroom',
        required: true,
    })
    location: string;
}

export class UpdateShowroom extends CreateShowroom {

}