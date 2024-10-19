import { IBaseRepository } from "src/app/core/repositories/interface/base-repository.interface";
import { ISaleItem } from "./sale-item.interface";

export const ISaleItemRepositoryInterface = 'ISaleItemRepository'
export interface ISaleItemRepository extends IBaseRepository<ISaleItem> { }
