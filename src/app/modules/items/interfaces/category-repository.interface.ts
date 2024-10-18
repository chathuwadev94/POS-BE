import { IBaseRepository } from "src/app/core/repositories/interface/base-repository.interface";
import { Category } from "../entities/category.entity";
import { IPagination } from "src/app/core/interfaces/page.interface";
import { IPaginatedEntity } from "src/app/core/interfaces/paginated-entity.interface";
import { ICategory } from "./category.interface";

export const ICategoryRepositoryInterface = 'ICategoryRepository'
export interface ICategoryRepository extends IBaseRepository<Category> {
    findAllWithPaginate(page: IPagination): Promise<IPaginatedEntity<ICategory>>
}
