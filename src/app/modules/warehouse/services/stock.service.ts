import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IStockRepository, IStockRepositoryInterface } from '../interfaces/stock-repository.interface';
import { CreateStockDto, UpdateStockDto } from '../dtos/create-stocks.dto';
import { IStock } from '../interfaces/stock.interface';
import { WarehouseService } from './warehouse.service';
import { IPagination } from 'src/app/core/interfaces/page.interface';
import { IPaginatedEntity } from 'src/app/core/interfaces/paginated-entity.interface';
import { ISaleItemDetails } from '../../sales/interfaces/sale.interface';

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
        const stock: IStock = await this.stockRepo.findStockByItemBarcodeAndWarehouseId(barcode, warehouseId);
        if (!stock) {
            throw new NotFoundException(`Out of Stock...`);
        }
        return stock;
    }

    // Find Stocks By  Id List
    async findStocksByIdList(idList: number[]): Promise<IStock[]> {
        return await this.stockRepo.findByIdList(idList);
    }

    // Update All
    async updateStocksList(stocks: IStock[]): Promise<IStock[]> {
        return await this.stockRepo.updateStockList(stocks);
    }

    // Find Stocks by Item ID
    async findStocksByItemIdAndWarehouse(itemId: number, warehouseId: number): Promise<IStock[]> {
        return await this.stockRepo.findStocksByItemId(itemId, warehouseId);
    }

    // get stockid and itemid and qty from FE
    async itemQtyIncrement(stockId: number, itemId: number, qty: number, warehouseId: number): Promise<ISaleItemDetails> {
        const stocksList: IStock[] = await this.findStocksByItemIdAndWarehouse(itemId, warehouseId);
        let itemDetail: ISaleItemDetails = { stockId: stockId, qty: qty, itemId: itemId };
        let relaventStock: IStock = stocksList.find(s => s.id === stockId)
        if (stocksList && stocksList.length > 0 && relaventStock.qty >= qty) {
            return itemDetail;
        } else if (stocksList.length == 1) {
            throw new NotFoundException('Item Quantity Unavailable in Stock...')
        }
        else {
            const qtyAvailableStockIndex: number = stocksList.findIndex(e => e.qty >= qty);
            if (qtyAvailableStockIndex >= 0) {
                let itemDetail: ISaleItemDetails = { stockId: stocksList[qtyAvailableStockIndex].id, qty: qty, itemId: itemId };
                return itemDetail;
            } else {
                throw new NotFoundException('Item Available in Two Difference Stock...');
            }

        }
    }
}
