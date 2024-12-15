import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IBarcodeRepository, IBarcodeRepositoryInterface } from '../interfaces/barcode-repository.interface';
import { CreateBarcodeDto, UpdateBarcodeDto } from '../dtos/barcode.dto';
import { IBarcode } from '../interfaces/barcode.interface';
import { ItemService } from './item.service';
import { IItem } from '../interfaces/item.interface';
import { IPagination } from 'src/app/core/interfaces/page.interface';
import { IPaginatedEntity } from 'src/app/core/interfaces/paginated-entity.interface';

@Injectable()
export class BarcodeService {

    constructor(
        @Inject(`${IBarcodeRepositoryInterface}`)
        private readonly barcodeRepo: IBarcodeRepository,
    ) { }

    // Create Barcode
    async create(createDto: CreateBarcodeDto): Promise<IBarcode> {
        await this.checkBarcode(createDto.code);
        return await this.barcodeRepo.create(createDto);
    }

    // Check Barcode
    async checkBarcode(code: string): Promise<any> {
        let isCode: IBarcode = await this.barcodeRepo.findByCode(code);
        if (isCode) {
            throw new BadRequestException('Barcode already exists..');
        }
        return
    }

    // Get All Barcode List
    async findAll(): Promise<IBarcode[]> {
        return await this.barcodeRepo.findAll();
    }

    // Get Barcode by Id
    async findById(id: number): Promise<IBarcode> {
        return await this.barcodeRepo.getOneWithItemById(id);
    }

    // Update Barcode
    async update(id: number, updateDto: UpdateBarcodeDto): Promise<IBarcode> {
        return await this.barcodeRepo.updateAndGetEntity(id, updateDto);
    }

    // Remove Barcode
    async delete(id: number): Promise<boolean> {
        return await this.barcodeRepo.deleteById(id);
    }

    // Get All Barcode
    async findAllWithPaginate(page: IPagination): Promise<IPaginatedEntity<IBarcode>> {
        return this.barcodeRepo.findAllWithPaginate(page);
    }

    // Search Barcode By Code
    async searchBycode(code: string, page: IPagination): Promise<IPaginatedEntity<IBarcode>> {
        return await this.barcodeRepo.searchBarcodeByCode(code, page);
    }

    // check codde 
    async checkCode(code: string): Promise<boolean> {
        let isCode: IBarcode = await this.barcodeRepo.findByCode(code);
        if (isCode) {
            return true;
        }
        else false;
    }

}
