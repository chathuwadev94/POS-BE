import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Stock } from './entities/stock.entity';
import { IWarehouseRepositoryInterface } from './interfaces/warehouse-repository.interface';
import { WarehouseRepositorty } from './repositories/warehouse.repository';
import { IStockRepositoryInterface } from './interfaces/stock-repository.interface';
import { StockRepository } from './repositories/stock.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Warehouse, Stock])
    ],
    providers: [
        {
            provide: IWarehouseRepositoryInterface,
            useClass: WarehouseRepositorty
        },
        {
            provide: IStockRepositoryInterface,
            useClass: StockRepository
        }
    ]
})
export class WarehouseModule { }
