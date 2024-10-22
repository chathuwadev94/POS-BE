import { IBaseRepository } from "src/app/core/repositories/interface/base-repository.interface";
import { Stock } from "../entities/stock.entity";
import { IPagination } from "src/app/core/interfaces/page.interface";
import { IPaginatedEntity } from "src/app/core/interfaces/paginated-entity.interface";
import { IStock } from "./stock.interface";

export const IStockRepositoryInterface = 'IStockRepository'
export interface IStockRepository extends IBaseRepository<Stock> {
    findAllwithpaginate(paginate: IPagination): Promise<IPaginatedEntity<IStock>>
    searchStockById(id: number, page: IPagination): Promise<IPaginatedEntity<IStock>>
    findSockByItemId(itemId: number): Promise<IStock>
    findStockByItemBarcodeAndWarehouseId(barcodeValue: number, warehouseId: number): Promise<IStock>
    findByIdList(idList: number[]): Promise<IStock[]>
    updateStockList(stocks: IStock[]): Promise<IStock[]>
    findStocksByItemId(itemId: number,warehouseId:number): Promise<IStock[]>
}
