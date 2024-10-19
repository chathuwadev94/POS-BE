import { Controller, Inject } from '@nestjs/common';
import { SaleItemService } from '../services/sale-item.service';

@Controller('sale-item')
export class SaleItemController {
    constructor(
        @Inject(SaleItemService.name)
        private readonly saleItemSer: SaleItemService
    ) { }
}
