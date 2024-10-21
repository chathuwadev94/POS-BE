import { BaseRepository } from "src/app/core/repositories/base-repository";
import { Sale } from "../entities/sale.entity";
import { ISaleRepository } from "../interfaces/sale-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IPaginatedEntity } from "src/app/core/interfaces/paginated-entity.interface";
import { ISale } from "../interfaces/sale.interface";
import { IPagination } from "src/app/core/interfaces/page.interface";

export class SaleRepository extends BaseRepository<Sale>
    implements ISaleRepository {
    constructor(
        @InjectRepository(Sale) private readonly saleRepo: Repository<Sale>
    ) {
        super(saleRepo);
    }

    async findByUserIdWithpaginate(userId: number, page: IPagination): Promise<IPaginatedEntity<ISale>> {
        return await this.getAllwithPaginate({ user: { id: userId } }, {}, ['user'], {}, page);
    }

    
    // async findByDateRange(startDate:Date,endDate:Date){
    //     return await this.getAllwithPaginate({ date }, {}, ['user'], {}, page);
    //     return await this.saleRepo
    //     .createQueryBuilder('sale')
    //     .where('sale.date >= :startDate', { startDate })
    //     .andWhere('sale.date <= :endDate', { endDate })
    //     .getMany();
    // }
}