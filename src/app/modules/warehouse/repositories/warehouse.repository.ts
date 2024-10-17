import { BaseRepository } from "src/app/core/repositories/base-repository";
import { Warehouse } from "../entities/warehouse.entity";
import { IWarehouseRepository } from "../interfaces/warehouse-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { IPagination } from "src/app/core/interfaces/page.interface";
import { IPaginatedEntity } from "src/app/core/interfaces/paginated-entity.interface";
import { IWarehouse } from "../interfaces/warehouse.interface";


export class WarehouseRepositorty
    extends BaseRepository<Warehouse>
    implements IWarehouseRepository {
    constructor(
        @InjectRepository(Warehouse) private readonly warehouseRepo: Repository<Warehouse>
    ) {
        super(warehouseRepo);
    }

    async findAllwithpaginate(paginate: IPagination): Promise<IPaginatedEntity<IWarehouse>> {
        return await this.getAllwithPaginate({}, {}, [], {}, paginate);
    }

    async searchWarehouseByLocation(location: string, page: IPagination): Promise<IPaginatedEntity<IWarehouse>> {
        return await this.getAllwithPaginate({ nic: Like(`%${location}%`) }, {}, [], {}, page);
    }

}