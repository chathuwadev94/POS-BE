import { BaseRepository } from "src/app/core/repositories/base-repository";
import { Barcode } from "../entities/barcode.entity";
import { IBarcodeRepository } from "../interfaces/barcode-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Like, Repository } from "typeorm";
import { IBarcode } from "../interfaces/barcode.interface";
import { IPagination } from "src/app/core/interfaces/page.interface";
import { IPaginatedEntity } from "src/app/core/interfaces/paginated-entity.interface";

export class BarcodeRepository extends BaseRepository<Barcode>
    implements IBarcodeRepository {
    constructor(
        @InjectRepository(Barcode) private readonly barcodeRepo: Repository<Barcode>
    ) {
        super(barcodeRepo);
    }

    async findAll(): Promise<IBarcode[]> {
        return await this.barcodeRepo.find();
    }

    async findAllWithPaginate(page: IPagination): Promise<IPaginatedEntity<IBarcode>> {
        return await this.getAllwithPaginate({}, {}, ['item'], {}, page);
    }

    async searchBarcodeByCode(code: string, page: IPagination): Promise<IPaginatedEntity<IBarcode>> {
        return await this.getAllwithPaginate({ code: Like(`%${code}%`) }, {}, ['item'], {}, page);
    }

    async findByCode(code: string): Promise<IBarcode> {
        return await this.getOne({ code: code });
    }

    async getOneWithItemById(id: number): Promise<IBarcode> {
        return await this.getOneById(id, {}, ['item']);
    }

}