import { RolesBuilder } from 'nest-access-control';
import { UserController } from 'src/app/modules/user/controllers/user.controller';
import { AppRoles } from '../enums/role.enum';
import { AuthController } from 'src/app/modules/auth/controller/auth.controller';
import { CategoryController } from 'src/app/modules/items/controllers/category.controller';
import { BarcodeController } from 'src/app/modules/items/controllers/barcode.controller';
import { ItemController } from 'src/app/modules/items/controllers/item.controller';
import { StockController } from 'src/app/modules/warehouse/controllers/stock.controller';
import { WarehouseController } from 'src/app/modules/warehouse/controllers/warehouse.controller';

export const roles: RolesBuilder = new RolesBuilder();


roles
    .grant([AppRoles.SUPER_ADMIN])
    .createOwn([UserController.name,AuthController.name,CategoryController.name,BarcodeController.name,ItemController.name,StockController.name,WarehouseController.name])
    .readOwn([UserController.name,AuthController.name,CategoryController.name,BarcodeController.name,ItemController.name,StockController.name,WarehouseController.name])
    .updateOwn([UserController.name,AuthController.name,CategoryController.name,BarcodeController.name,ItemController.name,StockController.name,WarehouseController.name])
    .deleteOwn([UserController.name,AuthController.name,CategoryController.name,BarcodeController.name,ItemController.name,StockController.name,WarehouseController.name])

    .grant([AppRoles.ADMIN])
    .createOwn([UserController.name,AuthController.name,CategoryController.name,BarcodeController.name,ItemController.name,StockController.name,WarehouseController.name])
    .readOwn([UserController.name,AuthController.name,CategoryController.name,BarcodeController.name,ItemController.name,StockController.name,WarehouseController.name])
    .updateOwn([UserController.name,AuthController.name,CategoryController.name,BarcodeController.name,ItemController.name,StockController.name,WarehouseController.name])
    .deleteOwn([UserController.name,AuthController.name,CategoryController.name,BarcodeController.name,ItemController.name,StockController.name,WarehouseController.name])

    .grant([AppRoles.MANAGER])
    .createOwn([CategoryController.name,BarcodeController.name,ItemController.name,StockController.name,WarehouseController.name])
    .readOwn([CategoryController.name,BarcodeController.name,ItemController.name,StockController.name,WarehouseController.name])
    .updateOwn([CategoryController.name,BarcodeController.name,ItemController.name,StockController.name,WarehouseController.name])
    .deleteOwn([CategoryController.name,BarcodeController.name,ItemController.name,StockController.name,WarehouseController.name])

    .grant([AppRoles.CASHIER])
    .readOwn([CategoryController.name,BarcodeController.name,ItemController.name,StockController.name,WarehouseController.name])

    .grant([AppRoles.DEFAULT])
    .readOwn([UserController.name, AuthController.name])

