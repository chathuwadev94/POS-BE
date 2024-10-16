import { IBaseRepository } from "src/app/core/repositories/interface/base-repository.interface";
import { Warehouse } from "../entities/warehouse.entity";

export const IWarehouseRepositoryInterface = 'IWarehouseRepository';
export interface IWarehouseRepository extends IBaseRepository<Warehouse> { }
