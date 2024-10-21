import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Stock } from './entities/stock.entity';
import { IWarehouseRepositoryInterface } from './interfaces/warehouse-repository.interface';
import { WarehouseRepositorty } from './repositories/warehouse.repository';
import { IStockRepositoryInterface } from './interfaces/stock-repository.interface';
import { StockRepository } from './repositories/stock.repository';
import { StockController } from './controllers/stock.controller';
import { WarehouseController } from './controllers/warehouse.controller';
import { WarehouseService } from './services/warehouse.service';
import { StockService } from './services/stock.service';
import { IShowroomRepositoryInterface } from './interfaces/showroom-repository.interface';
import { showroomRepository } from './repositories/showroom.repository';
import { Showroom } from './entities/showroom.entity';
import { ShowroomController } from './controllers/showroom.controller';
import { ShowroomService } from './services/showroom.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Warehouse, Stock, Showroom])
    ],
    controllers: [StockController, WarehouseController, ShowroomController],
    providers: [
        {
            provide: `${IWarehouseRepositoryInterface}`,
            useClass: WarehouseRepositorty
        },
        {
            provide: `${IStockRepositoryInterface}`,
            useClass: StockRepository
        },
        {
            provide: `${IShowroomRepositoryInterface}`,
            useClass: showroomRepository
        },
        {
            provide: WarehouseService.name,
            useClass: WarehouseService
        },
        {
            provide: StockService.name,
            useClass: StockService
        },
        {
            provide: ShowroomService.name,
            useClass: ShowroomService
        }
    ],
    exports: [
        {
            provide: StockService.name,
            useClass: StockService
        }
    ]
})
export class WarehouseModule { }
