import { ISale } from "./sale.interface";
import { IBaseRepository } from "src/app/core/repositories/interface/base-repository.interface";

export const ISaleRepositoryInterface = 'ISaleRepository'
export interface ISaleRepository extends IBaseRepository<ISale> { }
