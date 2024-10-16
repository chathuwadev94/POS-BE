import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/app/config/system/configuration';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({ 
            secret: configuration().jwt.secret ,
            signOptions:{expiresIn:configuration().jwt.expire_time}
        }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [
        JwtStrategy,
        JwtAuthGuard,
        {
            provide: AuthService.name,
            useClass: AuthService
        }
    ],
})
export class AuthModule { }

