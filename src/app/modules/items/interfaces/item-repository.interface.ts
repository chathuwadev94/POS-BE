import { IBaseRepository } from "src/app/core/repositories/interface/base-repository.interface";
import { Item } from "../entities/item.entity";
import { IPagination } from "src/app/core/interfaces/page.interface";
import { IPaginatedEntity } from "src/app/core/interfaces/paginated-entity.interface";
import { IItem } from "./item.interface";

export const IItemRepositoryInterface = 'IItemRepository'
export interface IItemRepository extends IBaseRepository<Item> {
    findAllwithPagination(page: IPagination): Promise<IPaginatedEntity<IItem>>
    searchItemByName(name: string, page: IPagination): Promise<IPaginatedEntity<IItem>>
    searchItemByBarcode(code: string, page: IPagination): Promise<IPaginatedEntity<IItem>>
    findItemsbyCategory(categoryId: number, page: IPagination): Promise<IPaginatedEntity<IItem>>
    findByIdList(idList: number[]): Promise<IItem[]>
}
