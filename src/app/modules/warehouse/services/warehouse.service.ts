import { Inject, Injectable } from '@nestjs/common';
import { IWarehouseRepository, IWarehouseRepositoryInterface } from '../interfaces/warehouse-repository.interface';
import { CreateWarehouseDto, UpdateWarehouseDto } from '../dtos/create-warehouse.dto';
import { IWarehouse } from '../interfaces/warehouse.interface';
import { IPagination } from 'src/app/core/interfaces/page.interface';
import { IPaginatedEntity } from 'src/app/core/interfaces/paginated-entity.interface';

@Injectable()
export class WarehouseService {

    constructor(
        @Inject(`${IWarehouseRepositoryInterface}`)
        private readonly warehouseRepo: IWarehouseRepository
    ) { }

    // Create Warehouse
    async create(createDto: CreateWarehouseDto): Promise<IWarehouse> {
        return await this.warehouseRepo.create(createDto);
    }

    // Find All Warehouse
    async findAllWithPagination(page: IPagination): Promise<IPaginatedEntity<IWarehouse>> {
        return await this.warehouseRepo.findAllwithpaginate(page);
    }

    // Find By Id
    async findById(id: number): Promise<IWarehouse> {
        return await this.warehouseRepo.getOneById(id);
    }

    // Update Warehouse
    async update(id: number, updateDto: UpdateWarehouseDto): Promise<IWarehouse> {
        return await this.warehouseRepo.updateAndGetEntity(id, updateDto);
    }

    // Delete Warehouse
    async delete(id: number): Promise<boolean> {
        return await this.warehouseRepo.deleteById(id);
    }

    // Search Warehouse By Location
    async searchWarehouseByLocation(location: string, page: IPagination): Promise<IPaginatedEntity<IWarehouse>> {
        return await this.warehouseRepo.searchWarehouseByLocation(location, page);
    }

}
