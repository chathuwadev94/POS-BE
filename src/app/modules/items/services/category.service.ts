import { Inject, Injectable } from '@nestjs/common';
import { ICategoryRepository, ICategoryRepositoryInterface } from '../interfaces/category-repository.interface';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { ICategory } from '../interfaces/category.interface';
import { IPagination } from 'src/app/core/interfaces/page.interface';
import { IPaginatedEntity } from 'src/app/core/interfaces/paginated-entity.interface';

@Injectable()
export class CategoryService {

    constructor(
        @Inject(`${ICategoryRepositoryInterface}`)
        private readonly categoryRepo: ICategoryRepository
    ) { }

    // Create Category
    async create(createDto: CreateCategoryDto): Promise<ICategory> {
        return await this.categoryRepo.create(createDto);
    }

    // Get All Categories
    async findAllWithPaginate(page: IPagination): Promise<IPaginatedEntity<ICategory>> {
        return this.categoryRepo.findAllWithPaginate(page);
    }

    // Get Category by Id
    async findById(id: number): Promise<ICategory> {
        return await this.categoryRepo.getOneById(id);
    }

    // Update Category
    async update(id: number, updateDto: UpdateCategoryDto): Promise<ICategory> {
        return await this.categoryRepo.updateAndGetEntity(id, updateDto);
    }

    // Remove Category
    async delete(id: number): Promise<boolean> {
        const category: ICategory = await this.findById(id);
        return await this.categoryRepo.deleteById(category.id);
    }

    
}
