import { Inject, Injectable } from '@nestjs/common';
import { IWarehouseRepository, IWarehouseRepositoryInterface } from '../interfaces/warehouse-repository.interface';

@Injectable()
export class WarehouseService {

    constructor(
        @Inject(`${IWarehouseRepositoryInterface}`)
        private readonly warehouseRepo: IWarehouseRepository
    ) { }
}
