import { BaseRepository } from "src/app/core/repositories/base-repository";
import { Stock } from "../entities/stock.entity";
import { IStockRepository } from "../interfaces/stock-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


export class StockRepository
    extends BaseRepository<Stock>
    implements IStockRepository {
    constructor(
        @InjectRepository(Stock) private readonly stockRepo: Repository<Stock>
    ) {
        super(stockRepo);
    }
}