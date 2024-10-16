import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IUserRepositoryInterface } from './interfaces/user-repository.interface';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [UserController],
    providers: [
        {
            provide: `${IUserRepositoryInterface}`,
            useClass: UserRepository
        },
        {
            provide:UserService.name,
            useClass:UserService
        }
    ],
    exports:[
        {
            provide:UserService.name,
            useClass:UserService
        }
    ]
})
export class UserModule { }
