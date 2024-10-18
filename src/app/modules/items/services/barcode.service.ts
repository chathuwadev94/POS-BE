import { Inject, Injectable } from '@nestjs/common';
import { IBarcodeRepository, IBarcodeRepositoryInterface } from '../interfaces/barcode-repository.interface';
import { CreateBarcodeDto, UpdateBarcodeDto } from '../dtos/barcode.dto';
import { IBarcode } from '../interfaces/barcode.interface';
import { ItemService } from './item.service';
import { IItem } from '../interfaces/item.interface';

@Injectable()
export class BarcodeService {

    constructor(
        @Inject(`${IBarcodeRepositoryInterface}`)
        private readonly barcodeRepo: IBarcodeRepository,
        @Inject(ItemService.name)
        private readonly itemServ: ItemService
    ) { }

    // Create Barcode
    async create(createDto: CreateBarcodeDto): Promise<IBarcode> {
        const item: IItem = await this.itemServ.findById(createDto.itemId);
        let { itemId, ...rest } = createDto;
        let create: IBarcode = { ...rest, item: item }
        return await this.barcodeRepo.create(create);
    }

    // Get All Barcodes

    // Get Barcode by Id
    async findById(id: number): Promise<IBarcode> {
        return await this.barcodeRepo.getOneById(id);
    }

    // Update Barcode
    async update(id: number, updateDto: UpdateBarcodeDto): Promise<IBarcode> {
        return await this.barcodeRepo.updateAndGetEntity(id, updateDto);
    }

    // Remove Barcode
    async delete(id: number): Promise<boolean> {
        return await this.barcodeRepo.deleteById(id);
    }

    // Find All Barcodes by Item

}
