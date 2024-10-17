import { ApiProperty } from "@nestjs/swagger";
import { IWarehouse } from "../interfaces/warehouse.interface";

export class CreateStockDto {
    @ApiProperty({
        type: Number,
        description: 'Quantity of the item',
        required: true,
    })
    qty: number;

    @ApiProperty({
        type: Number,
        description: 'Item ID',
        required: true,
    })
    itemId: number;

    @ApiProperty({
        type: Number,
        description: 'Warehouse ID',
        required: true,
    })
    warehouseId: number;

    @ApiProperty({
        type: Number,
        description: 'Warehouse Capacity',
        required: true,
    })
    capacity: number;

    warehous:IWarehouse
}

export class UpdateStockDto extends CreateStockDto {}