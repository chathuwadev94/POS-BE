import { Inject, Injectable } from '@nestjs/common';
import { ISaleItemRepository, ISaleItemRepositoryInterface } from '../interfaces/sale-item-repository.interface';
import { CreateSaleItemDto } from '../dtos/sale-item.dto';
import { ISaleItem } from '../interfaces/sale-item.interface';
import { IPagination } from 'src/app/core/interfaces/page.interface';
import { IPaginatedEntity } from 'src/app/core/interfaces/paginated-entity.interface';

@Injectable()
export class SaleItemService {
    constructor(
        @Inject(`${ISaleItemRepositoryInterface}`)
        private readonly saleItemRepo: ISaleItemRepository
    ) { }

    // Create SaleItemÍ
    async create(createDto: CreateSaleItemDto): Promise<ISaleItem> {
        return await this.saleItemRepo.create(createDto);
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
    async createSaleItemList(createDto: CreateSaleItemDto[]): Promise<ISaleItem[]> {
        return await this.saleItemRepo.createSet(createDto);
    }
}
