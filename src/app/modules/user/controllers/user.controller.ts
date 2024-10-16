import { Body, Controller, Get, HttpCode, Inject, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { TransformInterceptor } from 'src/app/core/interceptors/transform.interceptor';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ViewUserDto } from '../dtos/view-user.dto';
import { UserResponseDto } from '../dtos/response-user.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';


@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(
    @Inject(UserService.name) private readonly userSer: UserService
  ) { }

  // Create User
  @Post()
  @UseInterceptors(new TransformInterceptor(new ViewUserDto()))
  @ApiOperation({ description: 'Create User' })
  @ApiCreatedResponse({ type: UserResponseDto, description: 'Create User' })
  @ApiBody({ type: CreateUserDto })
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userSer.create(createUserDto);
  }

  // Get User By Id
  @Get(':id')
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: UserController.name,
    action: 'read',
    possession: "own",
  })
  @UseInterceptors(new TransformInterceptor(new ViewUserDto()))
  @ApiOperation({ description: 'Get  User by Id' })
  @ApiCreatedResponse({ type: UserResponseDto, description: 'Get User by Id' })
  async getUserById(@Param('id') id: number) {
    return await this.userSer.findUserWithLocationById(id);
  }

}
