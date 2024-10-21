import { IShowroom } from "../interfaces/showroom.interface";

export class ViewShowroomDto {
    formatDataSet(data: IShowroom) {
        return {
            id: data.id,
            address: data.address || null,
            location: data.location || null,
            warehouseId: data.warehouseId || null,
            warehouse: data.warehouse || null,
            users: data.users || []

        };
    }
}