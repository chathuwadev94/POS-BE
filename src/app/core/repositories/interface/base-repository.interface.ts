import { DeepPartial, FindOneOptions, FindManyOptions, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IPagination } from '../../interfaces/page.interface';
import { IPaginatedEntity } from '../../interfaces/paginated-entity.interface';

export interface IBaseRepository<T> {
  /**
   * Create entity and return
   * @param data
   */
  create(data: DeepPartial<T>): Promise<T>;

  createSet(data: DeepPartial<T[]>): Promise<T[]>

  getOne(
    where: FindOneOptions['where'],
    select?: FindOneOptions['select'],
    relations?: FindManyOptions['relations']
  ): Promise<T>;

  createAndGetEntity(data: DeepPartial<T>): Promise<T>;

  getAll(
    where?: FindManyOptions['where'],
    select?: FindManyOptions['select'],
    relations?: FindManyOptions['relations'],
    sort?: FindManyOptions['order'],
    page?: IPagination
  ): Promise<[T[], number]>;

  /**
   * Get entity by id with relations
   * @param id
   * @param select
   * @param relations
   */
  getOneById(
    id: number,
    select?: FindManyOptions['select'],
    relations?: FindManyOptions['relations']
  ): Promise<T>;

  update(
    id: number,
    data: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult>

  updateAndGetEntity(
    id: number,
    data: QueryDeepPartialEntity<T>
  ): Promise<T>

  deleteById(id: any): Promise<boolean>;

  getAllwithPaginate(
    where?: FindManyOptions['where'],
    select?: FindManyOptions['select'],
    relations?: FindManyOptions['relations'],
    sort?: FindManyOptions['order'],
    page?: IPagination
  ): Promise<IPaginatedEntity<T>>

}
