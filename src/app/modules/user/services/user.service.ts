import { BadRequestException, HttpException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository, IUserRepositoryInterface } from '../interfaces/user-repository.interface';
import { CreateUserDto, UpdateDto } from '../dtos/create-user.dto';
import { IUser } from '../interfaces/user.interface';
import { hash } from 'bcrypt'
import { AppRoles } from 'src/app/core/enums/role.enum';
import { IPagination } from 'src/app/core/interfaces/page.interface';
import { IPaginatedEntity } from 'src/app/core/interfaces/paginated-entity.interface';

@Injectable()
export class UserService {

    constructor(
        @Inject(`${IUserRepositoryInterface}`)
        private readonly userRepo: IUserRepository
    ) { }

    async create(userDto: CreateUserDto): Promise<IUser> {
        const user: IUser = await this.findByUserName(userDto.userName);
        await this.checkNicAvailability(userDto.nic);
        if (user) {
            throw new BadRequestException('User name already exist..')
        }
        userDto.password = await this.hashPassword(userDto.password);
        userDto.roles = [AppRoles.DEFAULT];
        return await this.userRepo.create(userDto);
    }

    async hashPassword(password: string): Promise<string> {
        return hash(password, 10);
    }

    async checkNicAvailability(nic: string) {
        await this.userRepo.isNicAvailable(nic).catch(e => {
            throw new HttpException(e.response, e.status);
        })
    }

    async findByUserName(userName: string): Promise<IUser> {
        return await this.userRepo.findByUserName(userName);
    }

    async findById(id: number): Promise<IUser> {
        return await this.userRepo.getOneById(id);
    }

    async findAll(pagination: IPagination): Promise<IPaginatedEntity<IUser>> {
        return await this.userRepo.findAllwithpaginate(pagination);
    }

    async update(id: number, updateDto: UpdateDto): Promise<IUser> {
        return await this.userRepo.updateAndGetEntity(id, updateDto);
    }

    async userSearchByNIC(nic: string, paginate: IPagination): Promise<IPaginatedEntity<IUser>> {
        return await this.userRepo.findUsersByNIC(nic, paginate);
    }
}
