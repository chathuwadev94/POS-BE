import { Body, Controller, Get, HttpCode, Inject, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { TransformInterceptor } from 'src/app/core/interceptors/transform.interceptor';
import { CreateUserDto, UpdateDto } from '../dtos/create-user.dto';
import { ViewUserDto } from '../dtos/view-user.dto';
import { UserResponseDto } from '../dtos/response-user.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { IPagination } from 'src/app/core/interfaces/page.interface';
import { Pager } from 'src/app/core/decorators/page.decorator';
import { CurrentUser } from 'src/app/core/decorators/current-user.decorator';
import { ITokenUser } from 'src/app/core/interfaces/token-user';
import { UserFilterDto } from '../../auth/dtos/userFilter.dto';


@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(
    @Inject(UserService.name) private readonly userSer: UserService
  ) { }

  // Create User
  @Post()
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: UserController.name,
    action: 'create',
    possession: "own",
  })
  @UseInterceptors(new TransformInterceptor(new ViewUserDto()))
  @ApiOperation({ description: 'Create User' })
  @ApiCreatedResponse({ type: UserResponseDto, description: 'Create User' })
  @ApiBody({ type: CreateUserDto })
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {

    return await this.userSer.create(createUserDto);
  }

  // Get All Users with Paginate
  @Get()
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: UserController.name,
    action: 'read',
    possession: "own",
  })
  @UseInterceptors(new TransformInterceptor(new ViewUserDto()))
  @ApiOperation({ description: 'Get All Users' })
  @ApiCreatedResponse({ type: [UserResponseDto], description: 'Get All Users' })
  async getAllUsers(
    @Query() filter: UserFilterDto,
    @Pager() pagination: IPagination
  ) {
    return await this.userSer.findAll(pagination);
  }

  // Get LoggedIn User
  @Get('logedIn')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(new ViewUserDto()))
  @ApiOperation({ description: 'Get Logged In User' })
  @ApiCreatedResponse({ type: UserResponseDto, description: 'Get Logged In User' })
  async getLoggedInUser(@CurrentUser() currentUser: ITokenUser) {
    return await this.userSer.findById(currentUser.id);
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
    return await this.userSer.findById(id);
  }

  //Update User
  @Put(':id')
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: UserController.name,
    action: 'update',
    possession: "own",
  })
  @UseInterceptors(new TransformInterceptor(new ViewUserDto))
  @ApiOperation({ description: 'Update User' })
  @ApiCreatedResponse({ type: UserResponseDto, description: 'Update User' })
  @ApiBody({ type: UpdateDto })
  @HttpCode(200)
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateDto) {
    return await this.userSer.update(id, updateUserDto);
  }

  // Search User
  @Get('user-search')
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: UserController.name,
    action: 'read',
    possession: "own"
  })
  @UseInterceptors(new TransformInterceptor(new ViewUserDto()))
  @ApiOperation({ description: 'Get User by NIC' })
  @ApiCreatedResponse({ type: UserResponseDto, description: 'Get Userby NIC' })
  @HttpCode(200)
  async getUserByNIC(
    @Query() filter: UserFilterDto,
    @Pager() pagination: IPagination,
    @Query('nic') nic: string) {
    return await this.userSer.userSearchByNIC(nic, pagination);
  }


}
