import { IItem } from "../interfaces/item.interface";

export class ViewItemDto {
    formatDataSet(data: IItem) {
        return {
            id: data.id,
            name: data.name || null,
            description: data.description || null,
            cost: data.cost || null,
            image: data.image || null,
            manufactur: data.manufactur || null,
            category: data.category || null,
            barcode: data.barcode || null,
            stock: data.stock || null,
        };
    }
}