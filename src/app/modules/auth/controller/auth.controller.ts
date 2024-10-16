import { Body, Controller, Inject, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import {
    ApiTags, ApiBody,
    ApiCreatedResponse,
    ApiOperation,
} from '@nestjs/swagger';
import { ChangePasswordResDto, ChangeRoleResDto, LoginResDto } from '../dtos/response.dto';
import { ChangePasswordDto, ChangeRoleDto, ChangeStatusDto, LoginDto, RefreshDto } from '../dtos/auth.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { TransformInterceptor } from 'src/app/core/interceptors/transform.interceptor';
import { CurrentUser } from 'src/app/core/decorators/current-user.decorator';
import { ITokenUser } from 'src/app/core/interfaces/token-user';
import { ViewUserDto } from '../../user/dtos/view-user.dto';
import { ACGuard, UseRoles } from 'nest-access-control';
import { ViewChangePasswordDto, ViewChangeRoleDto } from '../dtos/view-auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor(
        @Inject(AuthService.name) private readonly authServ: AuthService
    ) { }

    // User Login
    @Post('login')
    @ApiOperation({ description: 'User Login' })
    @ApiCreatedResponse({ type: LoginResDto, description: 'User Login' })
    @ApiBody({ type: LoginDto })
    async login(@Body() loginDto: LoginDto): Promise<any> {
        return await this.authServ.login(loginDto)
    }

    //Get Accesss token By Refresh token
    @Post('refresh-token')
    @ApiOperation({ description: 'Get access token by refresh token' })
    @ApiCreatedResponse({ type: RefreshDto, description: 'Get access token by refresh token' })
    @ApiBody({ type: RefreshDto })
    async refreshToken(@Body() refreshDto: RefreshDto): Promise<any> {
        return await this.authServ.refreshToken(refreshDto);
    }

    // Change Password(Everyone)
    @Patch('change-password')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(new TransformInterceptor(new ViewChangePasswordDto()))
    @ApiOperation({ description: 'Change User Password' })
    @ApiCreatedResponse({ type: ChangePasswordResDto, description: 'Change User Password' })
    @ApiBody({ type: ChangePasswordDto })
    async changePassword(@Body() changePasswordDto: ChangePasswordDto, @CurrentUser() user: ITokenUser): Promise<any> {
        return await this.authServ.changePassword(user.id, changePasswordDto);
    }

    // Reset Password(Admin)
    @Patch(':id/reset-password')
    @UseGuards(JwtAuthGuard)
    @UseRoles({
        resource: AuthController.name,
        action: 'update',
        possession: "own"
    })
    @UseInterceptors(new TransformInterceptor(new ViewUserDto()))
    @ApiOperation({ description: 'Reset Password By Admin' })
    @ApiCreatedResponse({ description: 'Reset Password By Admin' })
    async resetPasssword(@Param('id') id: number): Promise<any> {
        return await this.authServ.resetPassword(id);
    }

    // Change Role(Admin)
    @Patch(':id/change-role')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: AuthController.name,
        action: 'update',
        possession: "own"
    })
    @UseInterceptors(new TransformInterceptor(new ViewChangeRoleDto()))
    @ApiOperation({ description: 'Change User Role' })
    @ApiCreatedResponse({ type: ChangeRoleResDto, description: 'Change User Role' })
    @ApiBody({ type: ChangeRoleDto })
    async changeRole(@Body() changeRloeDto: ChangeRoleDto, @Param('id') id: number): Promise<any> {
        return await this.authServ.changeRole(id, changeRloeDto.role);
    }
    
     //Change Status
     @Patch(':id/change-status')
     @UseGuards(JwtAuthGuard)
     @UseRoles({
         resource: AuthController.name,
         action: 'update',
         possession: "own"
     })
     @UseInterceptors(new TransformInterceptor(new ViewUserDto()))
     @ApiOperation({ description: 'Change User Status' })
     @ApiCreatedResponse({ type: ChangePasswordResDto, description: 'Change User Status' })
     @ApiBody({ type: ChangeStatusDto })
     async changeStatus(@Body() changeStatusDto: ChangeStatusDto, @Param('id') id: number): Promise<any> {
         return await this.authServ.changeStatus(id, changeStatusDto);
     }

}
