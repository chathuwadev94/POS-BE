import { ApiProperty } from "@nestjs/swagger";
import { IShowroom } from "../interfaces/showroom.interface";
import { IWarehouse } from "../interfaces/warehouse.interface";
import { IUser } from "../../user/interfaces/user.interface";

export class ResponseShowroomDto implements IShowroom {

    @ApiProperty({ type: Number, description: 'Showroom Id' })
    id?: number;
    @ApiProperty({ type: String, description: 'Showroom Name' })
    name?: string;
    @ApiProperty({ type: String, description: 'Showroom Address' })
    address?: string;
    @ApiProperty({ type: Number, description: 'Showroom Warehouse Id' })
    warehouseId?: number;
    @ApiProperty({ type: String, description: 'Showroom Location' })
    location?: string;
    @ApiProperty({ type: Number, description: 'Showroom Warehouse' })
    warehouse?: IWarehouse;
    @ApiProperty({ type: Number, description: 'Showroom Users' })
    users?: IUser[];

}