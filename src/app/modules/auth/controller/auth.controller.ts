import { Body, Controller, Get, HttpCode, Inject, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import {
    ApiTags, ApiBody,
    ApiCreatedResponse,
    ApiOperation,
} from '@nestjs/swagger';
import { LoginResDto } from '../dtos/response.dto';
import { LoginDto, RefreshDto } from '../dtos/auth.dto';

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

}
