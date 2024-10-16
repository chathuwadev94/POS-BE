import { IBaseRepository } from "src/app/core/repositories/interface/base-repository.interface";
import { Stock } from "../entities/stock.entity";

export const IStockRepositoryInterface = 'IStockRepository'
export interface IStockRepository extends IBaseRepository<Stock> { }
