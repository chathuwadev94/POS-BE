import { IBaseRepository } from "src/app/core/repositories/interface/base-repository.interface";
import { IShowroom } from "./showroom.interface";
import { IPagination } from "src/app/core/interfaces/page.interface";
import { IPaginatedEntity } from "src/app/core/interfaces/paginated-entity.interface";

export const IShowroomRepositoryInterface = 'IShowroomRepository'
export interface IShowroomRepository extends IBaseRepository<IShowroom> {
    findAllwithpaginate(paginate: IPagination): Promise<IPaginatedEntity<IShowroom>>
 }
