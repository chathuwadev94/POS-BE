import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ISaleRepository, ISaleRepositoryInterface } from '../interfaces/sale-repository.interface';
import { CreateSaleDto, UpdateSaleDto } from '../dtos/sale.dto';
import { ISale, ISaleCalculation, ISaleItemDetails } from '../interfaces/sale.interface';
import { UserService } from '../../user/services/user.service';
import { IUser } from '../../user/interfaces/user.interface';
import { IPagination } from 'src/app/core/interfaces/page.interface';
import { IPaginatedEntity } from 'src/app/core/interfaces/paginated-entity.interface';
import { StockService } from '../../warehouse/services/stock.service';
import { IStock } from '../../warehouse/interfaces/stock.interface';
import { ISaleItem } from '../interfaces/sale-item.interface';
import { CreateSaleItemDto } from '../dtos/sale-item.dto';
import { SaleItemService } from './sale-item.service';
import { ISaleItemsResponse } from '../dtos/response-sale.dto';

@Injectable()
export class SaleService {
    constructor(
        @Inject(`${ISaleRepositoryInterface}`)
        private readonly saleRepo: ISaleRepository,
        @Inject(UserService.name)
        private readonly userServ: UserService,
        @Inject(StockService.name)
        private readonly stockServ: StockService,
        @Inject(SaleItemService.name)
        private readonly saleItemsServ: SaleItemService
    ) { }

    // Create Sale
    async create(createDto: CreateSaleDto, userId: number): Promise<ISaleItemsResponse> {
        if (createDto.itemCount !== createDto.saleItemsList.length) {
            throw new BadRequestException('Item Count does not match...');
        }
        const user: IUser = await this.userServ.findUserWithShowroomById(userId);
        const saleCalculation: ISaleCalculation = (await this.calculateTotalAmmountAndGetFormatedSaleItemList(createDto.saleItemsList));
        let createSale: ISale = { user: user, date: new Date, itemCount: createDto.saleItemsList.length, totalAmount: saleCalculation.totalAmount };
        const sale: ISale = await this.saleRepo.create(createSale);
        const createSaleItemDto: CreateSaleItemDto = { sale: sale, saleItems: saleCalculation.saleItemList }
        const response = await this.saleItemsServ.createSaleItemList(createSaleItemDto);
        await this.updateStocks(createDto.saleItemsList);
        return response
    }

    // Calculate Total Amount of Sale and Formated Saleitems List According to Stock price and Total Amount
    async calculateTotalAmmountAndGetFormatedSaleItemList(saleItems: ISaleItemDetails[]): Promise<ISaleCalculation> {
        const stocks: IStock[] = await this.getStocksBySaleItemsDetails(saleItems);
        let tempSaleItems: ISaleItem[] = []
        let totalAmount = 0;

        stocks.map((stock: IStock) => {
            const saleItem: ISaleItemDetails = saleItems.find(e => e.stockId === stock.id);
            totalAmount += saleItem.qty * stock.unitPrice;
            let saleItemObj: ISaleItem = { quantity: saleItem.qty, unitPrice: stock.unitPrice, totalPrice: (saleItem.qty * stock.unitPrice), itemId: saleItem.itemId }
            tempSaleItems.push(saleItemObj);
        });
        return { totalAmount: totalAmount, saleItemList: tempSaleItems };
    }

    // Update Stocks Quantity after Sale
    async updateStocks(saleItems: ISaleItemDetails[]): Promise<IStock[]> {
        const stocks: IStock[] = await this.getStocksBySaleItemsDetails(saleItems);
        const tempStockList: IStock[] = stocks.map((stock: IStock) => {
            const saleItem: ISaleItemDetails = saleItems.find(e => e.stockId === stock.id)
            stock.qty -= saleItem.qty;
            return stock;
        })
        return await this.stockServ.updateStocksList(tempStockList);
    }

    // Get Stocks By Stocks Id List
    async getStocksBySaleItemsDetails(saleItems: ISaleItemDetails[]): Promise<IStock[]> {
        const stockIdList: number[] = saleItems.map(ele => ele.stockId);
        return await this.stockServ.findStocksByIdList(stockIdList);
    }

    // Get Sale By ID
    async findById(id: number): Promise<ISale> {
        return await this.saleRepo.getOneById(id);
    }

    // Get Sale By User
    async findByUserIdWithPaginate(userId: number, page: IPagination): Promise<IPaginatedEntity<ISale>> {
        return await this.saleRepo.findByUserIdWithpaginate(userId, page);
    }

    // Get Sale By Date

    // Update Sale
    async update(id: number, updateDto: UpdateSaleDto): Promise<ISale> {
        return await this.saleRepo.updateAndGetEntity(id, updateDto);
    }

}
