import { IBaseRepository } from "src/app/core/repositories/interface/base-repository.interface";
import { User } from "../entities/user.entity";
import { IUser } from "./user.interface";

export const IUserRepositoryInterface = 'IUserRepository';
export interface IUserRepository extends IBaseRepository<User> {
    findByUserName(userName: string): Promise<IUser>
    isNicAvailable(nic: string): Promise<boolean>
    findUserWithLocationById(id: number): Promise<IUser>
}
