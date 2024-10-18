import { ICategory } from "../interfaces/category.interface";

export class ViewCategoryDto {
    formatDataSet(data: ICategory) {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            items: data.item
        };
    }
}