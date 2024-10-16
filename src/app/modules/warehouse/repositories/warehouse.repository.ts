import { BaseRepository } from "src/app/core/repositories/base-repository";
import { Warehouse } from "../entities/warehouse.entity";
import { IWarehouseRepository } from "../interfaces/warehouse-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


export class WarehouseRepositorty
    extends BaseRepository<Warehouse>
    implements IWarehouseRepository {
    constructor(
        @InjectRepository(Warehouse) private readonly warehouseRepo: Repository<Warehouse>
    ) {
        super(warehouseRepo);
    }
}