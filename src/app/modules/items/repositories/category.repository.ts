import { BaseRepository } from "src/app/core/repositories/base-repository";
import { Category } from "../entities/category.entity";
import { ICategoryRepository } from "../interfaces/category-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IPagination } from "src/app/core/interfaces/page.interface";
import { IPaginatedEntity } from "src/app/core/interfaces/paginated-entity.interface";
import { ICategory } from "../interfaces/category.interface";

export class CategoryRepository extends BaseRepository<Category>
    implements ICategoryRepository {
    constructor(
        @InjectRepository(Category) private readonly categoryRepo: Repository<Category>
    ) {
        super(categoryRepo);
    }

    async findAllWithPaginate(page: IPagination): Promise<IPaginatedEntity<ICategory>> {
        return await this.getAllwithPaginate({}, {}, [], {}, page);
    }
    
}