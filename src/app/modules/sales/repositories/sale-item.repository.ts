import { BaseRepository } from "src/app/core/repositories/base-repository";
import { SaleItem } from "../entities/sale-Item.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IPaginatedEntity } from "src/app/core/interfaces/paginated-entity.interface";
import { ISaleItem } from "../interfaces/sale-item.interface";
import { IPagination } from "src/app/core/interfaces/page.interface";

export class SaleItemRepository extends BaseRepository<SaleItem>
    implements SaleItemRepository {
    constructor(
        @InjectRepository(SaleItem) private readonly saleItemRepo: Repository<SaleItem>
    ) {
        super(saleItemRepo);
    }

    async findSaleItemsBySaleIdWithPaginate(saleId: number, page: IPagination): Promise<IPaginatedEntity<ISaleItem>> {
        return await this.getAllwithPaginate({ sale: { id: saleId } }, {}, ['sale'], {},page);
    }
}