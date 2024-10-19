import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({
        type:String,
        description: 'Category Name',
        required: true,
    })
    name:string;

    @ApiProperty({
        type:String,
        description: 'Category Description',
        required: true,
    })
    description:string;
}

export class UpdateCategoryDto extends CreateCategoryDto {}