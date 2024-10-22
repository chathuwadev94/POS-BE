import { Body, Controller, Get, HttpCode, Inject, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { StockService } from '../services/stock.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { TransformInterceptor } from 'src/app/core/interceptors/transform.interceptor';
import { ViewItemQtyIncrementDto, ViewStockDto } from '../dtos/view-stock.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateStockDto, UpdateStockDto } from '../dtos/create-stocks.dto';
import { IStock } from '../interfaces/stock.interface';
import { ResponseItemQtyIncrementDto, ResponseStockDto } from '../dtos/response-stock.dto';
import { Pager } from 'src/app/core/decorators/page.decorator';
import { IPagination } from 'src/app/core/interfaces/page.interface';
import { StockFilterDto, itemQtyIncrementDto } from '../dtos/stock-filter.dto';
import { CurrentUser } from 'src/app/core/decorators/current-user.decorator';
import { ITokenUser } from 'src/app/core/interfaces/token-user';

@Controller('stock')
@ApiTags('Stock')
@ApiBearerAuth()
export class StockController {

    constructor(
        @Inject(StockService.name)
        private readonly stockServ: StockService
    ) { }

    // Create Stocke
    @Post()
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: StockController.name,
        action: 'create',
        possession: "own"
    })
    @UseInterceptors(new TransformInterceptor(new ViewStockDto()))
    @ApiOperation({ description: 'Create Stock' })
    @ApiCreatedResponse({ type: CreateStockDto, description: 'Create Stocke' })
    @ApiBody({ type: CreateStockDto })
    @HttpCode(201)
    async create(@Body() createDto: CreateStockDto): Promise<IStock> {
        return await this.stockServ.create(createDto);
    }

    // Get All Stocks with Paginate
    @Get()
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: StockController.name,
        action: 'read',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewStockDto()))
    @ApiOperation({ description: 'Get All Stockes' })
    @ApiCreatedResponse({ type: [ResponseStockDto], description: 'Get All Stockes' })
    async getAllStocks(
        @Query() filter: StockFilterDto,
        @Pager() pagination: IPagination
    ) {
        return await this.stockServ.findAllWithPaginate(pagination);
    }

    // Search Stock by Id
    @Get('stock-search')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: StockController.name,
        action: 'read',
        possession: "own"
    })
    @UseInterceptors(new TransformInterceptor(new ViewStockDto()))
    @ApiOperation({ description: 'Get Stock by Id' })
    @ApiCreatedResponse({ type: ResponseStockDto, description: 'Get Stock by Id' })
    @HttpCode(200)
    async searchStockById(
        @Query() filter: StockFilterDto,
        @Pager() pagination: IPagination,
        @Query('id') id: string) {
        return await this.stockServ.searchStockById(parseInt(id), pagination);
    }

    @Get('item-qty-increment')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: StockController.name,
        action: 'read',
        possession: "own"
    })
    @UseInterceptors(new TransformInterceptor(new ViewItemQtyIncrementDto()))
    @ApiOperation({ description: 'Item Quantity Increment' })
    @ApiCreatedResponse({ type: ResponseItemQtyIncrementDto, description: 'Item Quantity Increment' })
    @HttpCode(200)
    async itemQtyIncrement(
        @Query() filter: itemQtyIncrementDto,
        @CurrentUser() user: ITokenUser
    ) {
        return await this.stockServ.itemQtyIncrement(parseInt(filter.stockId), parseInt(filter.itemId), parseInt(filter.qty), user.warehouseId);
    }

    // Get Stocke By Item Id According to Relavant Warehouse
    @Get('warehouse-item')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: StockController.name,
        action: 'read',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewStockDto()))
    @ApiOperation({ description: 'Get  Stock by Barcode And Warehouse' })
    @ApiCreatedResponse({ type: ResponseStockDto, description: 'Get  Stock by Barcode And Warehouse' })
    async getStockByitemIdAndWarehouse(
        @Query('barcode') barcode: string,
        @CurrentUser() user: ITokenUser
    ) {
        return await this.stockServ.findStockByBarcodeAndWarehouseId(parseInt(barcode), user.warehouseId);
    }

    // Get Stocke By Id
    @Get(':id')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: StockController.name,
        action: 'read',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewStockDto()))
    @ApiOperation({ description: 'Get  Stock by Id' })
    @ApiCreatedResponse({ type: ResponseStockDto, description: 'Get Stock by Id' })
    async getStockById(@Param('id') id: number) {
        return await this.stockServ.findById(id);
    }

    //Update Stock
    @Put(':id')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: StockController.name,
        action: 'update',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewStockDto))
    @ApiOperation({ description: 'Update Stock' })
    @ApiCreatedResponse({ type: ResponseStockDto, description: 'Update Stock' })
    @ApiBody({ type: UpdateStockDto })
    @HttpCode(200)
    async updateStock(@Param('id') id: number, @Body() updateUserDto: UpdateStockDto) {
        return await this.stockServ.update(id, updateUserDto);
    }




}
