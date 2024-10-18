import { Controller, Inject } from '@nestjs/common';
import { BarcodeService } from '../services/barcode.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('barcode')
@ApiTags('Barcode')
@ApiBearerAuth()
export class BarcodeController {

    constructor(
        @Inject(BarcodeService.name)
        private readonly barcodeServ: BarcodeService
    ) { }

    // Create Barcode
    // Get All Barcodes
    // Get Barcode by Id
    // Update Barcode
    // Remove Barcode
    // Find All Barcodes by Item
}
