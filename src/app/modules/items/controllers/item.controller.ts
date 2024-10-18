import { Controller, Inject } from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('item')
@ApiTags('Item')
@ApiBearerAuth()
export class ItemController {

    constructor(
        @Inject(ItemService.name)
        private readonly itemServ: ItemService
    ) { }

    // Create Item
    // Get All Items
    // Get Item by Id
    // Update Item
    // Remove Item
    // Get Item By stock
    // Get Items by Category
    // Search Item by Name
    // Search Item By Barcode
}
