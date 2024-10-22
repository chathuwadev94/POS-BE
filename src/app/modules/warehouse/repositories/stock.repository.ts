import { BaseRepository } from "src/app/core/repositories/base-repository";
import { Stock } from "../entities/stock.entity";
import { IStockRepository } from "../interfaces/stock-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { IPagination } from "src/app/core/interfaces/page.interface";
import { IPaginatedEntity } from "src/app/core/interfaces/paginated-entity.interface";
import { IStock } from "../interfaces/stock.interface";


export class StockRepository
    extends BaseRepository<Stock>
    implements IStockRepository {
    constructor(
        @InjectRepository(Stock) private readonly stockRepo: Repository<Stock>
    ) {
        super(stockRepo);
    }


    async findAllwithpaginate(paginate: IPagination): Promise<IPaginatedEntity<IStock>> {
        return await this.getAllwithPaginate({}, {}, [], {}, paginate);
    }

    async searchStockById(id: number, page: IPagination): Promise<IPaginatedEntity<IStock>> {
        return await this.getAllwithPaginate({ id: id }, {}, [], {}, page);
    }

    async findSockByItemId(itemId: number): Promise<IStock> {
        return await this.getOne({ itemId: itemId })
    }

    async findStockByItemBarcodeAndWarehouseId(barcodeValue: number, warehouseId: number): Promise<IStock> {
        return await this.stockRepo
            .createQueryBuilder('stock')
            .innerJoinAndSelect('stock.item', 'item')  // Join the item to get its relation
            .innerJoinAndSelect('item.barcode', 'barcode')  // Join the barcode related to the item
            .where('stock.warehouseId = :warehouseId', { warehouseId })
            .andWhere('stock.qty > 0')
            .andWhere('barcode.code = :barcodeValue', { barcodeValue })
            .orderBy('stock.createdAt', 'DESC')
            .getOne();
    }

    async findByIdList(idList: number[]): Promise<IStock[]> {
        return await this.stockRepo
            .createQueryBuilder('stock')
            .where('stock.id IN (:...idList)', { idList: idList })
            .getMany();
    }

    async updateStockList(stocks: IStock[]): Promise<IStock[]> {
        return await this.stockRepo.save(stocks);
    }


    async findStocksByItemId(itemId: number, warehouseId: number): Promise<IStock[]> {
        return await this.stockRepo
            .createQueryBuilder('stock')
            .where('stock.itemId = :itemId', { itemId })
            .where('stock.warehouseId = :warehouseId', { warehouseId })
            .andWhere('stock.qty > 0')
            .orderBy('stock.createdAt', 'DESC')
            .getMany();
    }

}