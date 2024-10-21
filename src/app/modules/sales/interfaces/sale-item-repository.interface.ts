import { IBaseRepository } from "src/app/core/repositories/interface/base-repository.interface";
import { ISaleItem } from "./sale-item.interface";
import { IPagination } from "src/app/core/interfaces/page.interface";
import { IPaginatedEntity } from "src/app/core/interfaces/paginated-entity.interface";

export const ISaleItemRepositoryInterface = 'ISaleItemRepository'
export interface ISaleItemRepository extends IBaseRepository<ISaleItem> {
    findSaleItemsBySaleIdWithPaginate(saleId: number, page: IPagination): Promise<IPaginatedEntity<ISaleItem>>
 }
