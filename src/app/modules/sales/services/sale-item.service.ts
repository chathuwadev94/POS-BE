import { Inject, Injectable } from '@nestjs/common';
import { ISaleItemRepository, ISaleItemRepositoryInterface } from '../interfaces/sale-item-repository.interface';
import { CreateSaleItemDto } from '../dtos/sale-item.dto';
import { ISaleItem } from '../interfaces/sale-item.interface';
import { IPagination } from 'src/app/core/interfaces/page.interface';
import { IPaginatedEntity } from 'src/app/core/interfaces/paginated-entity.interface';
import { create } from 'domain';
import { IItem } from '../../items/interfaces/item.interface';
import { ItemService } from '../../items/services/item.service';
import { ISaleItemsResponse } from '../dtos/response-sale.dto';

@Injectable()
export class SaleItemService {
    constructor(
        @Inject(`${ISaleItemRepositoryInterface}`)
        private readonly saleItemRepo: ISaleItemRepository,
        @Inject(ItemService.name)
        private readonly itemServ: ItemService
    ) { }

    // Create SaleItemÍ
    async create(createDto: CreateSaleItemDto): Promise<ISaleItem> {
        return await this.saleItemRepo.create(createDto);
    }

    // Create SaleItemObj
    async createSalesItemDto(createDto: CreateSaleItemDto): Promise<ISaleItem[]> {
        let saleItemDto: ISaleItem[] = [];
        const itemIds: number[] = createDto.saleItems.map(item => item.itemId);
        const itemList: IItem[] = await this.itemServ.findItemsByIdList(itemIds);
        createDto.saleItems.map((saleItem: ISaleItem) => {
            const item: IItem = itemList.find(item => item.id === saleItem.itemId);
            saleItemDto.push({ ...saleItem, item: item, sale: createDto.sale })
        })
        return saleItemDto
    }

    // Get SaleItem By Id
    async findById(id: number): Promise<ISaleItem> {
        return await this.saleItemRepo.getOneById(id);
    }

    // Get SaleItem By SaleId
    async findBySaleIdWithPaginate(saleId: number, page: IPagination): Promise<IPaginatedEntity<ISaleItem>> {
        return await this.saleItemRepo.findSaleItemsBySaleIdWithPaginate(saleId, page);
    }

    // Create SaleItem List
    async createSaleItemList(createDto: CreateSaleItemDto): Promise<ISaleItemsResponse> {
        const itemsListDto: ISaleItem[] = await this.createSalesItemDto(createDto);
        const saleItems: ISaleItem[] = await this.saleItemRepo.createSet(itemsListDto);
        const netAmount = saleItems.reduce((accumulator, item) => { return accumulator + item.totalPrice }, 0)
        const totalQty = saleItems.reduce((accumulator, item) => { return accumulator + item.quantity }, 0)

        const response: ISaleItemsResponse = { id: createDto.sale.id, itemsCount: itemsListDto.length, totalQty: totalQty, netAmount: netAmount, saleItems: saleItems }
        // Update Stock
        return response
    }
}
