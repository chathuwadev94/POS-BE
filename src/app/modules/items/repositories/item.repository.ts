import { BaseRepository } from "src/app/core/repositories/base-repository";
import { Item } from "../entities/item.entity";
import { IItemRepository } from "../interfaces/item-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { IPagination } from "src/app/core/interfaces/page.interface";
import { IPaginatedEntity } from "src/app/core/interfaces/paginated-entity.interface";
import { IItem } from "../interfaces/item.interface";

export class ItemRepository
    extends BaseRepository<Item>
    implements IItemRepository {
    constructor(
        @InjectRepository(Item) private readonly itemRepo: Repository<Item>
    ) {
        super(itemRepo);
    }

    async findAllwithPagination(page: IPagination): Promise<IPaginatedEntity<IItem>> {
        return await this.getAllwithPaginate({}, {}, ['category', 'barcode'], {}, page);
    }

    async searchItemByName(name: string, page: IPagination): Promise<IPaginatedEntity<IItem>> {
        return await this.getAllwithPaginate({ name: Like(`${name}%`) }, {}, ['category', 'barcode'], {}, page);
    }

    async searchItemByBarcode(code: string, page: IPagination): Promise<IPaginatedEntity<IItem>> {
        return await this.getAllwithPaginate({ barcode: { code: Like(`${code}%`) } }, {}, ['category', 'barcode'], {}, page);
    }

    async findItemsbyCategory(categoryId: number, page: IPagination): Promise<IPaginatedEntity<IItem>> {
        return await this.getAllwithPaginate({ category: { id: categoryId } }, {}, ['category', 'barcode'], {}, page);
    }

    async findByIdList(idList: number[]): Promise<IItem[]> {
        return await this.itemRepo
            .createQueryBuilder('item')
            .where('item.id IN (:...idList)', { idList: idList })
            .getMany();
    }

}