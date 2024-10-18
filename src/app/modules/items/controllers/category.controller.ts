import { Controller, Inject } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('category')
@ApiTags('Category')
@ApiBearerAuth()
export class CategoryController {

    constructor(
        @Inject(CategoryService.name)
        private readonly categoryServ: CategoryService
    ) { }

    // Create Category
    // Get All Categories
    // Get Category by Id
    // Update Category
    // Remove Category
}
