import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { SaleItem } from './entities/sale-Item.entity';
import { ISaleItemRepositoryInterface } from './interfaces/sale-item-repository.interface';
import { SaleRepository } from './repositories/sale.repository';
import { SaleItemRepository } from './repositories/sale-item.repository';
import { SaleService } from './services/sale.service';
import { SaleItemService } from './services/sale-item.service';
import { SaleController } from './controller/sale.controller';
import { UserModule } from '../user/user.module';
import { ISaleRepositoryInterface } from './interfaces/sale-repository.interface';
import { WarehouseModule } from '../warehouse/warehouse.module';
import { ItemModule } from '../items/item.module';

@Module({
    imports: [TypeOrmModule.forFeature([Sale, SaleItem]), UserModule, WarehouseModule, ItemModule],
    controllers: [SaleController],
    providers: [
        {
            provide: `${ISaleRepositoryInterface}`,
            useClass: SaleRepository
        },
        {
            provide: `${ISaleItemRepositoryInterface}`,
            useClass: SaleItemRepository
        },
        {
            provide: SaleService.name,
            useClass: SaleService
        },
        {
            provide: SaleItemService.name,
            useClass: SaleItemService
        }
    ]
})
export class SalesModule { }
