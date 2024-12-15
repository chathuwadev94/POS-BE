import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IItemRepository, IItemRepositoryInterface } from '../interfaces/item-repository.interface';
import { CategoryService } from './category.service';
import { CreateItemDto, UpdateItemDto } from '../dtos/item.dto';
import { IItem } from '../interfaces/item.interface';
import { ICategory } from '../interfaces/category.interface';
import { IPagination } from 'src/app/core/interfaces/page.interface';
import { IPaginatedEntity } from 'src/app/core/interfaces/paginated-entity.interface';
import { IBarcode } from '../interfaces/barcode.interface';
import { BarcodeService } from './barcode.service';

@Injectable()
export class ItemService {

    constructor(
        @Inject(`${IItemRepositoryInterface}`)
        private readonly itemRepo: IItemRepository,
        @Inject(CategoryService.name)
        private readonly categoryServ: CategoryService,
        @Inject(BarcodeService.name)
        private readonly barcodeServ: BarcodeService
    ) { }

    // Create Item
    async create(createDto: CreateItemDto): Promise<IItem> {
        const category: ICategory = await this.categoryServ.findById(createDto.categoryId);
        const barcode: IBarcode = await this.barcodeServ.findById(createDto.barcodeId)
        let { categoryId, barcodeId, ...rest } = createDto;
        let create: IItem = { ...rest, category: category, barcode: barcode };
        return await this.itemRepo.create(create);
    }

    // Get All Items
    async findAllwithPagination(page: IPagination): Promise<IPaginatedEntity<IItem>> {
        return await this.itemRepo.findAllwithPagination(page);
    }

    // Get Item by Id
    async findById(id: number): Promise<IItem> {
        return await this.itemRepo.findItemWithAllById(id);
    }

    // Update Item
    async update(id: number, updateDto: UpdateItemDto): Promise<IItem> {
        if (updateDto.categoryId) {
            let category: ICategory = await this.categoryServ.findById(updateDto.categoryId);
            let { categoryId, ...rest } = updateDto;
            let create: UpdateItemDto = { ...rest, category: category };
            updateDto = create;
        }
        if (updateDto.barcodeId) {
            const barcode: IBarcode = await this.barcodeServ.findById(updateDto.barcodeId)
            if(barcode.item){
                throw new BadRequestException("Barcode is reserved by another Item...")
            }
            let { barcodeId, ...rest } = updateDto;
            let create: UpdateItemDto = { ...rest, barcode: barcode };
            updateDto = create;
        }
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

    // find itemlis by id ist
    async findItemsByIdList(idList: number[]): Promise<IItem[]> {
        return await this.itemRepo.findByIdList(idList);
    }

}
