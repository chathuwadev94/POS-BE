import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ChangePasswordDto, ChangeStatusDto, LoginDto, RefreshDto } from '../dtos/auth.dto';
import { IUser } from '../../user/interfaces/user.interface';
import { compare } from 'bcrypt'
import configuration from 'src/app/config/system/configuration';
import { UpdateDto } from '../../user/dtos/create-user.dto';
import { UserStatus } from '../../user/enums/status.enum';

@Injectable()
@Injectable()
export class AuthService {

    constructor(
        @Inject(UserService.name) private readonly userSer: UserService
        , private jwtServ: JwtService
    ) { }

    async login(loginDto: LoginDto): Promise<any> {
        const user = await this.validateUser(loginDto);
        if (user.status == UserStatus.HOLD) {
            throw new BadRequestException("Your account has been hold please contact Admin..!")
        }
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
                showroomId:user.showroomId,
                warehouseId:user.showroom.warehouseId
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

    // Change Password
    async changePassword(userId: number, passwordChangeDto: ChangePasswordDto): Promise<boolean> {
        // getUser
        const user: IUser = await this.userSer.findById(userId);
        // verify old password
        if (user && !(await compare(passwordChangeDto.oldPassword, user.password))) {
            throw new UnauthorizedException('Invaide Credentials..');
        }
        // save new password
        let updateDto: UpdateDto = { password: await this.userSer.hashPassword(passwordChangeDto.newPassword) }
        return await this.userSer.update(user.id, updateDto) ? true : false;
    }


    //  Reset Password
    async resetPassword(id: number): Promise<boolean> {
        let updateDto: UpdateDto = { password: await this.userSer.hashPassword(configuration().jwt.pasword_reset) }
        return await this.userSer.update(id, updateDto) ? true : false;
    }

    // Change Role
    async changeRole(id: number, roles: string[]): Promise<boolean> {
        const user: IUser = await this.userSer.findById(id);
        let updateDto: UpdateDto = { roles: roles };
        return await this.userSer.update(user.id, updateDto) ? true : false;
    }

    async changeStatus(id: number, changeStatusDto: ChangeStatusDto): Promise<IUser> {
        const status: UserStatus = changeStatusDto.status;
        let updateDto: UpdateDto = { status: status }
        return await this.userSer.update(id, updateDto)
    }

}

