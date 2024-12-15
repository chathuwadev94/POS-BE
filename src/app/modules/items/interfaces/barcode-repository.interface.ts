import { IBaseRepository } from "src/app/core/repositories/interface/base-repository.interface";
import { Barcode } from "../entities/barcode.entity";
import { IBarcode } from "./barcode.interface";
import { IPagination } from "src/app/core/interfaces/page.interface";
import { IPaginatedEntity } from "src/app/core/interfaces/paginated-entity.interface";

export const IBarcodeRepositoryInterface = 'IBarcodeRepository'
export interface IBarcodeRepository extends IBaseRepository<Barcode> {
    findAll(): Promise<IBarcode[]>
    findAllWithPaginate(page: IPagination): Promise<IPaginatedEntity<IBarcode>>
    searchBarcodeByCode(code: string, page: IPagination): Promise<IPaginatedEntity<IBarcode>>
    findByCode(code: string): Promise<IBarcode>
    getOneWithItemById(id: number): Promise<IBarcode>
}
