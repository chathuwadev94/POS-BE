import { Controller, Inject } from '@nestjs/common';
import { SaleService } from '../services/sale.service';

@Controller('sale')
export class SaleController {
    constructor(
        @Inject(SaleService.name)
        private readonly saleServ: SaleService
    ) { }
}
