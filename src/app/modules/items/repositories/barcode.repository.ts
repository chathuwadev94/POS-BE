import { BaseRepository } from "src/app/core/repositories/base-repository";
import { Barcode } from "../entities/barcode.entity";
import { IBarcodeRepository } from "../interfaces/barcode-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class BarcodeRepository extends BaseRepository<Barcode>
    implements IBarcodeRepository {
    constructor(
        @InjectRepository(Barcode) private readonly barcodeRepo: Repository<Barcode>
    ) {
        super(barcodeRepo);
    }

}