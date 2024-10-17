import { IBaseRepository } from "src/app/core/repositories/interface/base-repository.interface";
import { Warehouse } from "../entities/warehouse.entity";
import { IPagination } from "src/app/core/interfaces/page.interface";
import { IPaginatedEntity } from "src/app/core/interfaces/paginated-entity.interface";
import { IWarehouse } from "./warehouse.interface";

export const IWarehouseRepositoryInterface = 'IWarehouseRepository';
export interface IWarehouseRepository extends IBaseRepository<Warehouse> { 
    findAllwithpaginate(paginate: IPagination): Promise<IPaginatedEntity<IWarehouse>>
    searchWarehouseByLocation(location: string, page: IPagination): Promise<IPaginatedEntity<IWarehouse>>
}
