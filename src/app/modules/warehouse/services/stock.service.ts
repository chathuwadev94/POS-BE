import { Inject, Injectable } from '@nestjs/common';
import { IStockRepository, IStockRepositoryInterface } from '../interfaces/stock-repository.interface';
import { CreateStockDto, UpdateStockDto } from '../dtos/create-stocks.dto';
import { IStock } from '../interfaces/stock.interface';
import { WarehouseService } from './warehouse.service';
import { IPagination } from 'src/app/core/interfaces/page.interface';
import { IPaginatedEntity } from 'src/app/core/interfaces/paginated-entity.interface';

@Injectable()
export class StockService {

    constructor(
        @Inject(`${IStockRepositoryInterface}`)
        private readonly stockRepo: IStockRepository,
        @Inject(WarehouseService.name)
        private readonly warehouseServ: WarehouseService
    ) { }

    // Create Stock
    async create(createDto: CreateStockDto): Promise<IStock> {
        const warehouse = await this.warehouseServ.findById(createDto.warehouseId);
        let stock: IStock = { ...createDto, warehouse: warehouse };
        return await this.stockRepo.create(stock);
    }

    // Find All Stock
    async findAllWithPaginate(page: IPagination): Promise<IPaginatedEntity<IStock>> {
        return await this.stockRepo.findAllwithpaginate(page);
    }

    // Find By Id
    async findById(id: number): Promise<IStock> {
        return await this.stockRepo.getOneById(id);
    }

    // Update Stock
    async update(id: number, updateDto: UpdateStockDto): Promise<IStock> {
        return await this.stockRepo.updateAndGetEntity(id, updateDto);
    }

    // Delete Stock
    async delete(id: number): Promise<boolean> {
        const stock = await this.findById(id);
        return await this.stockRepo.deleteById(stock.id);
    }

    // Search Stock By Id
    async searchStockById(id: number, page: IPagination): Promise<IPaginatedEntity<IStock>> {
        return await this.stockRepo.searchStockById(id, page);
    }

    // Find Stock by ItemId
    async findStockByItemId(itemId: number): Promise<IStock> {
        return await this.stockRepo.findSockByItemId(itemId);
    }

    // Find Stock By Barcode Value and WarehouseId
    async findStockByBarcodeAndWarehouseId(barcode: number, warehouseId: number): Promise<IStock> {
        return await this.stockRepo.findStockByItemBarcodeAndWarehouseId(barcode, warehouseId);
    }

    // Find Stocks By  Id List
    async findStocksByIdList(idList: number[]): Promise<IStock[]> {
        return await this.stockRepo.findByIdList(idList);
    }
}
