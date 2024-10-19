import { BaseRepository } from "src/app/core/repositories/base-repository";
import { SaleItem } from "../entities/sale-Item.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class SaleItemRepository extends BaseRepository<SaleItem>
    implements SaleItemRepository {
    constructor(
        @InjectRepository(SaleItem) private readonly saleItemRepo: Repository<SaleItem>
    ) {
        super(saleItemRepo);
    }
}