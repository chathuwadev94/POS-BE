import { IBaseRepository } from "src/app/core/repositories/interface/base-repository.interface";
import { Barcode } from "../entities/barcode.entity";

export const IBarcodeRepositoryInterface = 'IBarcodeRepository'
export interface IBarcodeRepository extends IBaseRepository<Barcode> { }
