import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { ViewCategoryDto } from '../dtos/view-category.dto';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { ICategory } from '../interfaces/category.interface';
import { ResponseCategoryDto } from '../dtos/response-category.dto';
import { TransformInterceptor } from 'src/app/core/interceptors/transform.interceptor';
import { CategoryFilterDto } from '../dtos/filter-category.dto';
import { Pager } from 'src/app/core/decorators/page.decorator';
import { IPagination } from 'src/app/core/interfaces/page.interface';
import { IPaginatedEntity } from 'src/app/core/interfaces/paginated-entity.interface';

@Controller('category')
@ApiTags('Category')
@ApiBearerAuth()
export class CategoryController {

    constructor(
        @Inject(CategoryService.name)
        private readonly categoryServ: CategoryService
    ) { }

    // Create Category
    @Post()
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: CategoryController.name,
        action: 'create',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewCategoryDto()))
    @ApiOperation({ description: 'Create Category' })
    @ApiCreatedResponse({ type: ResponseCategoryDto, description: 'Create Category' })
    @ApiBody({ type: CreateCategoryDto })
    async create(@Body() categoryDto: CreateCategoryDto): Promise<ICategory> {
        return await this.categoryServ.create(categoryDto);
    }

    // Get All Categories
    @Get()
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: CategoryController.name,
        action: 'read',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewCategoryDto))
    @ApiOperation({ description: "Get all categories" })
    @ApiCreatedResponse({ type: ResponseCategoryDto, description: "Get all categories" })
    async getAll(
        @Query() filter: CategoryFilterDto,
        @Pager() page: IPagination
    ): Promise<IPaginatedEntity<ICategory>> {
        return await this.categoryServ.findAllWithPaginate(page);
    }

    // Get Category by Id
    @Get(':id')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: CategoryController.name,
        action: 'read',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewCategoryDto))
    @ApiOperation({ description: "Get category by id" })
    @ApiCreatedResponse({ type: ResponseCategoryDto, description: "Get category by id" })
    async getbyId(
        @Param() id: number
    ): Promise<ICategory> {
        return await this.categoryServ.findById(id);
    }

    // Update Category
    @Put(':id')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: CategoryController.name,
        action: 'update',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewCategoryDto))
    @ApiOperation({ description: "Update Category" })
    @ApiCreatedResponse({ type: ResponseCategoryDto, description: "Update Category" })
    async update(
        @Param() id: number,
        @Body() updateCategoryDto: UpdateCategoryDto
    ): Promise<ICategory> {
        return await this.categoryServ.update(id, updateCategoryDto);
    }

    // Remove Category
    @Delete(':id')
    @UseRoles({
        resource: CategoryController.name,
        action: 'delete',
        possession: "own",
    })
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseInterceptors(new TransformInterceptor(new ViewCategoryDto))
    @ApiOperation({ description: "Delete Category" })
    @ApiCreatedResponse({ type: ResponseCategoryDto, description: "Delete Category" })
    async delete(
        @Param() id: number,
    ): Promise<boolean> {
        return await this.categoryServ.delete(id);
    }
}
