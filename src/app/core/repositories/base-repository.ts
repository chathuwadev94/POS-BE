import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IBaseRepository } from './interface/base-repository.interface';
import { IPagination } from '../interfaces/page.interface';
import { IPaginatedEntity } from '../interfaces/paginated-entity.interface';


export abstract class BaseRepository<T> implements IBaseRepository<T> {
  private entity: Repository<T>;
  constructor(entity: Repository<T>) {
    this.entity = entity;
  }


  /**
 * Get all data with count
 * @param where
 * @param select
 * @param relations
 * @param sort
 * @param page
 * @returns
 */
  async getAll(
    where?: FindManyOptions['where'],
    select?: FindManyOptions['select'],
    relations?: FindManyOptions['relations'],
    sort?: FindManyOptions['order'],
    page?: IPagination
  ): Promise<[T[], number]> {
    const options: Record<string, unknown> = {};
    if (select) {
      options['select'] = select;
    }
    if (where) {
      options['where'] = where;
    }
    if (relations) {
      options['relations'] = relations;
    }
    if (sort) {
      options['order'] = sort;
    }
    if (page) {
      options['skip'] = page.skip;
      options['take'] = page.limit;
    }

    return await this.entity.findAndCount(options);
  }

  /**
   * Get all data with count
   * @param where
   * @param select
   * @param relations
   * @param sort
   * @param page
   * @returns
   */
  async getAllwithPaginate(
    where?: FindManyOptions['where'],
    select?: FindManyOptions['select'],
    relations?: FindManyOptions['relations'],
    sort?: FindManyOptions['order'],
    page?: IPagination
  ): Promise<IPaginatedEntity<T>> {
    const options: Record<string, unknown> = {};
    if (select) {
      options['select'] = select;
    }
    if (where) {
      options['where'] = where;
    }
    if (relations) {
      options['relations'] = relations;
    }
    if (sort) {
      options['order'] = sort;
    }
    if (page) {
      options['skip'] = page.skip;
      options['take'] = page.limit;
    }
    const data = await this.entity.find(options);
    const pageInfo = await this.getPageInfo(options, page);
    return { data: data, ...pageInfo }
  } // getAll

  async getPageInfo<T>(query: any, page: IPagination): Promise<IPagination> {
    page = !page ? {} : page;
    page.totalCount = await this.count(query);
    page.totalPages = page.limit ? Math.ceil(page.totalCount / page.limit) : 1;
    return page;
  } // IPagination

  /**
   * Get count with filter
   * @param filter
   * @returns
   */
  async count(filter?: Record<string, unknown>): Promise<number> {
    return await this.entity.count(filter);
  } // count

  /**
   * Get entity by id with relations
   * @param id
   * @param select
   * @param relations
   * @returns
   */
  async getOneById(
    id: number,
    select?: FindManyOptions['select'],
    relations?: FindManyOptions['relations']
  ): Promise<T> {
    const options: Record<string, unknown> = {};
    options['where'] = { id };
    if (select) {
      options['select'] = select;
    }
    if (relations) {
      options['relations'] = relations;
    }
    return await this.entity.findOne(options);
  } // getOneByIds

  /**
   * Get entity
   * @param where
   * @param select
   * @param relations
   * @returns
   */
  async getOne(
    where: FindOneOptions['where'],
    select?: FindOneOptions['select'],
    relations?: FindManyOptions['relations']
  ): Promise<T> {
    const options: Record<string, unknown> = { where };
    if (select) {
      options['select'] = select;
    }
    if (relations) {
      options['relations'] = relations;
    }

    return await this.entity.findOne(options);
  } // getOne

  /**
   * Create entity
   * @param data
   * @returns
   */
  async create(data: DeepPartial<T>): Promise<T> {
    return this.entity.save(data);
  } // create

  /**
   * Create and return created entity
   * @param data
   * @returns
   */
  async createAndGetEntity(data: DeepPartial<T>): Promise<T> {
    return this.entity
      .save(data)
      .then(async (entity) => await this.getOneById((entity as any).id));
  } // createAndGetEntity

  async update(
    id: number,
    data: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult> {
    return this.entity.update(id, data);
  } // update

  /**
   * Update and return updated entity
   * @param id
   * @param data
   * @returns
   */
  async updateAndGetEntity(
    id: number,
    data: QueryDeepPartialEntity<T>
  ): Promise<T> {
    return this.entity
      .update(id, data)
      .then(async () => await this.getOneById(id));
  } // updateAndGetEntity

  async updateAll(
    criteria: number | number[],
    partialEntity: QueryDeepPartialEntity<T>
  ) {
    return await this.entity.update(criteria, partialEntity);
  } // updateAll

  /**
   * Delete entity
   * @param id
   * @returns
   */
  async remove(id: number) {
    return await this.entity.delete(id);
  } // remove

  /**
   * Soft delete
   * @param id
   * @returns
   */
  async softDelete(id: number) {
    return await this.entity.softDelete(id);
  } // softDelete

  async deleteById(id: any): Promise<boolean> {
    const entityId = this.getOneById(id);
    const res = await this.entity.delete(id);
    return !!res.affected;
  }

  /**
 * Create entity
 * @param data
 * @returns
 */
  async createSet(data: DeepPartial<T[]>): Promise<T[]> {
    return this.entity.save(data);
  } // create
}
