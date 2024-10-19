import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Item } from './entities/item.entity';
import { Barcode } from './entities/barcode.entity';
import { ICategoryRepositoryInterface } from './interfaces/category-repository.interface';
import { CategoryRepository } from './repositories/category.repository';
import { IItemRepositoryInterface } from './interfaces/item-repository.interface';
import { ItemRepository } from './repositories/item.repository';
import { IBarcodeRepositoryInterface } from './interfaces/barcode-repository.interface';
import { BarcodeRepository } from './repositories/barcode.repository';
import { ItemController } from './controllers/item.controller';
import { BarcodeController } from './controllers/barcode.controller';
import { CategoryController } from './controllers/category.controller';
import { ItemService } from './services/item.service';
import { BarcodeService } from './services/barcode.service';
import { CategoryService } from './services/category.service';
import { WarehouseModule } from '../warehouse/warehouse.module';

@Module({
    imports: [TypeOrmModule.forFeature([Category, Item, Barcode]),
        WarehouseModule
    ],
    controllers: [ItemController, BarcodeController, CategoryController],
    providers: [
        {
            provide: `${ICategoryRepositoryInterface}`,
            useClass: CategoryRepository
        },
        {
            provide: `${IItemRepositoryInterface}`,
            useClass: ItemRepository
        },
        {
            provide: `${IBarcodeRepositoryInterface}`,
            useClass: BarcodeRepository
        },
        {
            provide: ItemService.name,
            useClass: ItemService
        },
        {
            provide: BarcodeService.name,
            useClass: BarcodeService
        },
        {
            provide: CategoryService.name,
            useClass: CategoryService
        }
    ]
})
export class ItemModule { }
