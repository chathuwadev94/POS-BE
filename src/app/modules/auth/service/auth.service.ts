import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto, RefreshDto } from '../dtos/auth.dto';
import { IUser } from '../../user/interfaces/user.interface';
import { compare } from 'bcrypt'
import configuration from 'src/app/config/system/configuration';

@Injectable()
@Injectable()
export class AuthService {

    constructor(
        @Inject(UserService.name) private readonly userSer: UserService
        , private jwtServ: JwtService,
        private readonly configServ: ConfigService
    ) { }

    async login(loginDto: LoginDto): Promise<any> {
        const user = await this.validateUser(loginDto);
        return await this.getToken(user);
    }

    async validateUser(loginDto: LoginDto): Promise<any> {
        let user: IUser = await this.userSer.findByUserName(loginDto.userName);
        if (user && (await compare(loginDto.password, user.password))) {
            const { password, ...result } = user
            return result;
        } else {
            throw new HttpException('Invalide Credentials..', HttpStatus.BAD_REQUEST)
        }
    }

    private async getToken(user: IUser): Promise<any> {
        const payload = {
            userName: user.userName,
            roles: user.roles,
            sub: {
                id: user.id,
                role: user.roles,
            }
        }
        return { ...user, accessToken: this.jwtServ.sign(payload), refreshToken: this.jwtServ.sign(payload, { expiresIn: configuration().jwt.refresh_jwt_expire_time }) }
    }

    async refreshToken(refreshtokenDto: RefreshDto): Promise<any> {
        const { userName } = await this.jwtServ.verifyAsync(refreshtokenDto.refreshToken, {
            secret: configuration().jwt.secret
        }).catch(e => {
            throw new UnauthorizedException('Invaide Credentials..')
        })
        const user: IUser = await this.userSer.findByUserName(userName);
        const { password, ...result } = user;
        return await this.getToken(result)
    }
}

