import { ApiProperty } from "@nestjs/swagger";
import { ICategory } from "../interfaces/category.interface";
import { IItem } from "../interfaces/item.interface";

export class ResponseCategoryDto implements ICategory {

    @ApiProperty({ type: Number, description: 'Category Id' })
    id: number;

    @ApiProperty({ type: String, description: 'Category Name' })
    name: string;

    @ApiProperty({ type: String, description: 'Category Description' })
    description: string

    @ApiProperty({ type: [], description: 'Category Item' })
    item: IItem[]
}