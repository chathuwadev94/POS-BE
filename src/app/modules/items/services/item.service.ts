import { Inject, Injectable } from '@nestjs/common';
import { IItemRepository, IItemRepositoryInterface } from '../interfaces/item-repository.interface';
import { StockService } from '../../warehouse/services/stock.service';
import { CategoryService } from './category.service';
import { CreateItemDto, UpdateItemDto } from '../dtos/item.dto';
import { IItem } from '../interfaces/item.interface';
import { ICategory } from '../interfaces/category.interface';
import { IStock } from '../../warehouse/interfaces/stock.interface';
import { IPagination } from 'src/app/core/interfaces/page.interface';
import { IPaginatedEntity } from 'src/app/core/interfaces/paginated-entity.interface';

@Injectable()
export class ItemService {

    constructor(
        @Inject(`${IItemRepositoryInterface}`)
        private readonly itemRepo: IItemRepository,
        @Inject(CategoryService.name)
        private readonly categoryServ: CategoryService
    ) { }

    // Create Item
    async create(createDto: CreateItemDto): Promise<IItem> {
        const category: ICategory = await this.categoryServ.findById(createDto.categoryId);
        let { categoryId, ...rest } = createDto;
        let create: IItem = { ...rest, category: category };
        return await this.itemRepo.create(create);
    }

    // Get All Items
    async findAllwithPagination(page: IPagination): Promise<IPaginatedEntity<IItem>> {
        return await this.itemRepo.findAllwithPagination(page);
    }

    // Get Item by Id
    async findById(id: number): Promise<IItem> {
        return await this.itemRepo.getOneById(id);
    }

    // Update Item
    async update(id: number, updateDto: UpdateItemDto): Promise<IItem> {
        return await this.itemRepo.updateAndGetEntity(id, updateDto)
    }

    // Remove Item
    async remove(id: number): Promise<boolean> {
        return await this.itemRepo.deleteById(id);
    }

    // Get Items by Category
    async finditemsByCategory(categoryId: number, page: IPagination): Promise<IPaginatedEntity<IItem>> {
        return await this.itemRepo.findItemsbyCategory(categoryId, page);
    }

    // Search Item by Name
    async searchItemByName(name: string, page: IPagination): Promise<IPaginatedEntity<IItem>> {
        return await this.itemRepo.searchItemByName(name, page);
    }

    // Search Item By Barcode
    async searchItemByBarcode(code: string, page: IPagination): Promise<IPaginatedEntity<IItem>> {
        return await this.itemRepo.searchItemByBarcode(code, page);
    }

}
