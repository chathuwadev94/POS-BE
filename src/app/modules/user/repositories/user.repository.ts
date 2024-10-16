import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { BaseRepository } from "src/app/core/repositories/base-repository";
import { IUserRepository } from "../interfaces/user-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Like, Repository } from "typeorm";
import { IUser } from "../interfaces/user.interface";
import { IPagination } from "src/app/core/interfaces/page.interface";
import { IPaginatedEntity } from "src/app/core/interfaces/paginated-entity.interface";

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
    super(userRepository);
  }

  async findByUserName(userName: string): Promise<IUser> {
    return await this.getOne({ userName: userName });
  }

  async findUserWithLocationById(id: number): Promise<IUser> {
    return await this.getOneById(id, {}, ['locations']);
  }

  async isNicAvailable(nic: string): Promise<boolean> {
    const existingUser = await this.userRepository.findOne({ where: { nic } });
    if (existingUser) {
      throw new HttpException('NIC already exists.', HttpStatus.BAD_REQUEST);
    } else {
      return false
    }
  }

  async findAllwithpaginate(paginate: IPagination): Promise<IPaginatedEntity<IUser>> {
    return await this.getAllwithPaginate({}, {}, [], {}, paginate);
  }

}