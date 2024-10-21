import { ApiProperty } from "@nestjs/swagger";
import { IStock } from "../interfaces/stock.interface";
import { IWarehouse } from "../interfaces/warehouse.interface";
import { StockStatus } from "../enums/status.enum";

export class ResponseStockDto implements IStock {
    @ApiProperty({ type: Number, description: 'StockId' })
    id?: number;

    @ApiProperty({ type: Number, description: 'Quentity' })
    qty?: number;

    @ApiProperty({ type: Number, description: 'Warehouse Id' })
    warehouseId?: number;

    @ApiProperty({ type: Number, description: 'Item Id' })
    itemId?: number;

    @ApiProperty({ type: Number, enum:StockStatus, description: 'Status' })
    status?: number;

    @ApiProperty({ type: Number, enum:StockStatus, description: 'Status' })
    unitPrice: number;

    @ApiProperty({ type: String, description: 'Wearehouse' })
    warehouse?: IWarehouse;
    
}