import { IPagination } from "src/app/core/interfaces/page.interface";
import { ISale } from "./sale.interface";
import { IBaseRepository } from "src/app/core/repositories/interface/base-repository.interface";
import { IPaginatedEntity } from "src/app/core/interfaces/paginated-entity.interface";

export const ISaleRepositoryInterface = 'ISaleRepository'
export interface ISaleRepository extends IBaseRepository<ISale> { 
    findByUserIdWithpaginate(userId: number, page: IPagination): Promise<IPaginatedEntity<ISale>>
}
