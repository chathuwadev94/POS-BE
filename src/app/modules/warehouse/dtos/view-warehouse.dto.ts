import { IWarehouse } from "../interfaces/warehouse.interface";

export class ViewWarehouseDto {
    formatDataSet(data: IWarehouse) {
        return {
            id: data.id,
            location: data.location,
            name: data.name,
            capacity: data.capacity,
            stocks: data.stocks
        };
    }
} 