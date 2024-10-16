import { IWarehouse } from "../interfaces/warehouse.interface";

export class ViewStockDto {
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