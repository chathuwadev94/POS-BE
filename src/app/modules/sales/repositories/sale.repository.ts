import { BaseRepository } from "src/app/core/repositories/base-repository";
import { Sale } from "../entities/sale.entity";
import { ISaleRepository } from "../interfaces/sale-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class SaleRepository extends BaseRepository<Sale>
    implements ISaleRepository {
    constructor(
        @InjectRepository(Sale) private readonly saleRepo: Repository<Sale>
    ) {
        super(saleRepo);
    }
}