import { Body, Controller, Get, HttpCode, Inject, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { WarehouseService } from '../services/warehouse.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { CreateWarehouseDto, UpdateWarehouseDto } from '../dtos/create-warehouse.dto';
import { IWarehouse } from '../interfaces/warehouse.interface';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/app/core/interceptors/transform.interceptor';
import { ViewWarehouseDto } from '../dtos/view-warehouse.dto';
import { ResponseWarehouseDto } from '../dtos/response-warehouse.dto';
import { Pager } from 'src/app/core/decorators/page.decorator';
import { IPagination } from 'src/app/core/interfaces/page.interface';
import { WarehouseFilterDto } from '../dtos/warehouse-filter.dto';

@Controller('warehouse')
@ApiTags('Warehouse')
@ApiBearerAuth()
export class WarehouseController {

    constructor(
        @Inject(WarehouseService.name)
        private readonly warehouseServ: WarehouseService) { }


    // Create Warehouse
    @Post()
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: WarehouseController.name,
        action: 'create',
        possession: "own"
    })
    @UseInterceptors(new TransformInterceptor(new ViewWarehouseDto()))
    @ApiOperation({ description: 'Create Warehouse' })
    @ApiCreatedResponse({ type: CreateWarehouseDto, description: 'Create Warehouse' })
    @ApiBody({ type: CreateWarehouseDto })
    @HttpCode(201)
    async create(@Body() createDto: CreateWarehouseDto): Promise<IWarehouse> {
        return await this.warehouseServ.create(createDto);
    }

    // Get All Warehouses with Paginate
    @Get()
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: WarehouseController.name,
        action: 'read',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewWarehouseDto()))
    @ApiOperation({ description: 'Get All Warehouses' })
    @ApiCreatedResponse({ type: [ResponseWarehouseDto], description: 'Get All Warehouses' })
    async getAllWarehouse(
        @Query() filter: WarehouseFilterDto,
        @Pager() pagination: IPagination
    ) {
        return await this.warehouseServ.findAllWithPagination(pagination);
    }

    // Get Warehouse By Id
    @Get(':id')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: WarehouseController.name,
        action: 'read',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewWarehouseDto()))
    @ApiOperation({ description: 'Get  Warehouse by Id' })
    @ApiCreatedResponse({ type: ResponseWarehouseDto, description: 'Get Warehouse by Id' })
    async getWarehouseById(@Param('id') id: number) {
        return await this.warehouseServ.findById(id);
    }

    //Update Warehouse
    @Put(':id')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: WarehouseController.name,
        action: 'update',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewWarehouseDto))
    @ApiOperation({ description: 'Update Warehouse' })
    @ApiCreatedResponse({ type: ResponseWarehouseDto, description: 'Update Warehouse' })
    @ApiBody({ type: UpdateWarehouseDto })
    @HttpCode(200)
    async updateWarehouse(@Param('id') id: number, @Body() updateUserDto: UpdateWarehouseDto) {
        return await this.warehouseServ.update(id, updateUserDto);
    }

    // Search Warehouse by Location
    @Get('warehouse-search')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: WarehouseController.name,
        action: 'read',
        possession: "own"
    })
    @UseInterceptors(new TransformInterceptor(new ViewWarehouseDto()))
    @ApiOperation({ description: 'Get Warehouse by Location' })
    @ApiCreatedResponse({ type: ResponseWarehouseDto, description: 'Get Warehouse by Location' })
    @HttpCode(200)
    async getWarehouseByLocation(
        @Query() filter: WarehouseFilterDto,
        @Pager() pagination: IPagination,
        @Query('location') location: string) {
        return await this.warehouseServ.searchWarehouseByLocation(location, pagination);
    }
}
