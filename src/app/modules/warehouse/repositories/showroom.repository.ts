import { BaseRepository } from "src/app/core/repositories/base-repository";
import { Showroom } from "../entities/showroom.entity";
import { IShowroomRepository } from "../interfaces/showroom-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IPagination } from "src/app/core/interfaces/page.interface";
import { IPaginatedEntity } from "src/app/core/interfaces/paginated-entity.interface";
import { IShowroom } from "../interfaces/showroom.interface";

export class showroomRepository extends BaseRepository<Showroom>
    implements IShowroomRepository {
    constructor(
        @InjectRepository(Showroom) private readonly showroomRepo: Repository<Showroom>
    ) {
        super(showroomRepo);
    }

    async findAllwithpaginate(paginate: IPagination): Promise<IPaginatedEntity<IShowroom>> {
        return await this.getAllwithPaginate({}, {}, [], {}, paginate);
    }

}