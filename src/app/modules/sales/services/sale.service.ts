import { Inject, Injectable } from '@nestjs/common';
import { ISaleRepository, ISaleRepositoryInterface } from '../interfaces/sale-repository.interface';

@Injectable()
export class SaleService {
    constructor(
        @Inject(`${ISaleRepositoryInterface}`)
        private readonly saleRepo: ISaleRepository
    ) { }
}
