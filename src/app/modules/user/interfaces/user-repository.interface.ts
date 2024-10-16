import { IBaseRepository } from "src/app/core/repositories/interface/base-repository.interface";
import { User } from "../entities/user.entity";
import { IUser } from "./user.interface";
import { IPagination } from "src/app/core/interfaces/page.interface";
import { IPaginatedEntity } from "src/app/core/interfaces/paginated-entity.interface";

export const IUserRepositoryInterface = 'IUserRepository';
export interface IUserRepository extends IBaseRepository<User> {
    findByUserName(userName: string): Promise<IUser>
    isNicAvailable(nic: string): Promise<boolean>
    findUserWithLocationById(id: number): Promise<IUser>
    findAllwithpaginate(paginate: IPagination): Promise<IPaginatedEntity<IUser>>
    findUsersByNIC(nic: string, paginate: IPagination): Promise<IPaginatedEntity<IUser>>
}
