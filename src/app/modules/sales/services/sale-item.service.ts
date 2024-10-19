import { Inject, Injectable } from '@nestjs/common';
import { ISaleItemRepository, ISaleItemRepositoryInterface } from '../interfaces/sale-item-repository.interface';

@Injectable()
export class SaleItemService {
    constructor(
        @Inject(`${ISaleItemRepositoryInterface}`)
        private readonly saleItemRepo: ISaleItemRepository
    ) { }
}
