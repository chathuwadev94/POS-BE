import { Inject, Injectable } from '@nestjs/common';
import { ISaleRepository, ISaleRepositoryInterface } from '../interfaces/sale-repository.interface';
import { CreateSaleDto, UpdateSaleDto } from '../dtos/sale.dto';
import { ISale } from '../interfaces/sale.interface';
import { UserService } from '../../user/services/user.service';
import { IUser } from '../../user/interfaces/user.interface';
import { IPagination } from 'src/app/core/interfaces/page.interface';
import { IPaginatedEntity } from 'src/app/core/interfaces/paginated-entity.interface';

@Injectable()
export class SaleService {
    constructor(
        @Inject(`${ISaleRepositoryInterface}`)
        private readonly saleRepo: ISaleRepository,
        @Inject(UserService.name)
        private readonly userServ: UserService
    ) { }

    // Create Sale
    async create(createDto: CreateSaleDto, userId: number): Promise<ISale> {
        const user: IUser = await this.userServ.findUserWithShowroomById(userId);
        let createSale: ISale = { ...createDto, user: user };
        // create sale items
        return await this.saleRepo.create(createSale);

    }

    // Get Sale By ID
    async findById(id: number): Promise<ISale> {
        return await this.saleRepo.getOneById(id);
    }

    // Get Sale By User
    async findByUserIdWithPaginate(userId: number, page: IPagination): Promise<IPaginatedEntity<ISale>> {
        return await this.saleRepo.findByUserIdWithpaginate(userId, page);
    }

    // Get Sale By Date

    // Update Sale
    async update(id: number, updateDto: UpdateSaleDto): Promise<ISale> {
        return await this.saleRepo.updateAndGetEntity(id, updateDto);
    }

}
