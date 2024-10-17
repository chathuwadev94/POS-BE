import { ApiProperty } from "@nestjs/swagger";
import { IWarehouse } from "../interfaces/warehouse.interface";
import { IStock } from "../interfaces/stock.interface";

export class ResponseWarehouseDto implements IWarehouse {

    @ApiProperty({ type: Number, description: 'Warehouse Id' })
    id: number;

    @ApiProperty({ type: String, description: 'Name' })
    name: string;

    @ApiProperty({ type: String, description: 'Location' })
    location: string;

    @ApiProperty({ type: String, description: 'Address' })
    address: string;

    @ApiProperty({ type: Number, description: 'Capacity' })
    capacity: number;

    @ApiProperty({ type: [], description: 'Stocks' })
    stocks: IStock[];
}