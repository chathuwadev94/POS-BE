import { Inject, Injectable } from '@nestjs/common';
import { IShowroomRepository, IShowroomRepositoryInterface } from '../interfaces/showroom-repository.interface';
import { CreateShowroom, UpdateShowroom } from '../dtos/showroom.dto';
import { IShowroom } from '../interfaces/showroom.interface';
import { WarehouseService } from './warehouse.service';
import { IWarehouse } from '../interfaces/warehouse.interface';
import { IPagination } from 'src/app/core/interfaces/page.interface';
import { IPaginatedEntity } from 'src/app/core/interfaces/paginated-entity.interface';

@Injectable()
export class ShowroomService {

    constructor(
        @Inject(`${IShowroomRepositoryInterface}`)
        private readonly showroomRepo: IShowroomRepository,
        @Inject(WarehouseService.name)
        private readonly warehouseSer: WarehouseService
    ) { }

    // Create Showroom
    async create(createDto: CreateShowroom): Promise<IShowroom> {
        const warehouse: IWarehouse = await this.warehouseSer.findById(createDto.warehouseId);
        let showroom: IShowroom = { ...createDto, warehouse: warehouse };
        return await this.showroomRepo.create(showroom);
    }

    // Get All Showrooms
    async findAllWithPagination(page: IPagination): Promise<IPaginatedEntity<IShowroom>> {
        return await this.showroomRepo.findAllwithpaginate(page);
    }

    // Get Showroom by Id
    async findById(id: number): Promise<IShowroom> {
        return await this.showroomRepo.getOneById(id);
    }

    // update Showrooms
    async update(id: number, updateDto: UpdateShowroom): Promise<IShowroom> {
        const showroom: IShowroom = await this.findById(id);
        return await this.showroomRepo.updateAndGetEntity(showroom.id, updateDto);
    }
}
