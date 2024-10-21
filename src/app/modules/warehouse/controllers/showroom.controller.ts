import { Controller, Inject, Post, Get, Put, Body, UseGuards, UseInterceptors, HttpCode, Query, Param } from '@nestjs/common';
import { ShowroomService } from '../services/showroom.service';
import { ViewShowroomDto } from '../dtos/view-showroom.dto';
import { TransformInterceptor } from 'src/app/core/interceptors/transform.interceptor';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { CreateShowroom, UpdateShowroom } from '../dtos/showroom.dto';
import { ResponseShowroomDto } from '../dtos/response-showroom.dto';
import { IShowroom } from '../interfaces/showroom.interface';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pager } from 'src/app/core/decorators/page.decorator';
import { ShowroomFilterDto } from '../dtos/filter-showroom.dto';
import { IPagination } from 'src/app/core/interfaces/page.interface';

@Controller('showroom')
@ApiTags('Showroom')
@ApiBearerAuth()
export class ShowroomController {

    constructor(
        @Inject(ShowroomService.name)
        private readonly showroomServ: ShowroomService
    ) { }

    // Create Showroom
    @Post()
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: ShowroomController.name,
        action: 'create',
        possession: "own"
    })
    @UseInterceptors(new TransformInterceptor(new ViewShowroomDto()))
    @ApiOperation({ description: 'Create Showroom' })
    @ApiCreatedResponse({ type: ResponseShowroomDto, description: 'Create Showroom' })
    @ApiBody({ type: CreateShowroom })
    @HttpCode(201)
    async create(@Body() createDto: CreateShowroom): Promise<IShowroom> {
        return await this.showroomServ.create(createDto);
    }

    // Get All Showrooms with Paginate
    @Get()
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: ShowroomController.name,
        action: 'read',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewShowroomDto()))
    @ApiOperation({ description: 'Get All Showrooms' })
    @ApiCreatedResponse({ type: [ResponseShowroomDto], description: 'Get All Showrooms' })
    async getAll(
        @Query() filter: ShowroomFilterDto,
        @Pager() pagination: IPagination
    ) {
        return await this.showroomServ.findAllWithPagination(pagination);
    }

    // Get Showroom By Id
    @Get(':id')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: ShowroomController.name,
        action: 'read',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewShowroomDto()))
    @ApiOperation({ description: 'Get  Showroom by Id' })
    @ApiCreatedResponse({ type: ResponseShowroomDto, description: 'Get Showroom by Id' })
    async getById(@Param('id') id: number) {
        return await this.showroomServ.findById(id);
    }

    //Update Showroom
    @Put(':id')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: ShowroomController.name,
        action: 'update',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewShowroomDto))
    @ApiOperation({ description: 'Update Showroom' })
    @ApiCreatedResponse({ type: ResponseShowroomDto, description: 'Update showroom' })
    @ApiBody({ type: UpdateShowroom })
    @HttpCode(200)
    async updateStock(@Param('id') id: number, @Body() updateDto: UpdateShowroom) {
        return await this.showroomServ.update(id, updateDto);
    }

}
