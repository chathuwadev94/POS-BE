import { Body, Controller, Get, HttpCode, Inject, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { SaleService } from '../services/sale.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { TransformInterceptor } from 'src/app/core/interceptors/transform.interceptor';
import { ViewSaleDto, ViewSaleInvoiceResponseDto } from '../dtos/view-sale.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ISaleItemsResponse, SaleResponseDto } from '../dtos/response-sale.dto';
import { CreateSaleDto, UpdateSaleDto } from '../dtos/sale.dto';
import { CurrentUser } from 'src/app/core/decorators/current-user.decorator';
import { ITokenUser } from 'src/app/core/interfaces/token-user';
import { Pager } from 'src/app/core/decorators/page.decorator';
import { IPagination } from 'src/app/core/interfaces/page.interface';
import { SaleFilterDto } from '../dtos/filter-sale.dto';

@Controller('sale')
@ApiTags('Sale')
@ApiBearerAuth()
export class SaleController {
    constructor(
        @Inject(SaleService.name)
        private readonly saleServ: SaleService
    ) { }

    // Create Sale
    @Post()
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: SaleController.name,
        action: 'create',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewSaleInvoiceResponseDto()))
    @ApiOperation({ description: 'Create Sale' })
    @ApiCreatedResponse({ type: SaleResponseDto, description: 'Create Sale' })
    @ApiBody({ type: CreateSaleDto })
    @HttpCode(201)
    async create(@Body() createDto: CreateSaleDto, @CurrentUser() user: ITokenUser): Promise<ISaleItemsResponse> {
        return await this.saleServ.create(createDto, user.id);
    }


    // Get Sale By ID
    @Get(':id')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: SaleController.name,
        action: 'read',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewSaleDto()))
    @ApiOperation({ description: 'Get  Sale by Id' })
    @ApiCreatedResponse({ type: SaleResponseDto, description: 'Get Sale by Id' })
    async getUserById(@Param('id') id: number) {
        return await this.saleServ.findById(id);
    }

    // Update Sale
    @Put(':id')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: SaleController.name,
        action: 'update',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewSaleDto))
    @ApiOperation({ description: 'Update Sale' })
    @ApiCreatedResponse({ type: SaleController, description: 'Update Sale' })
    @ApiBody({ type: UpdateSaleDto })
    @HttpCode(200)
    async updateUser(@Param('id') id: number, @Body() updateDto: UpdateSaleDto) {
        return await this.saleServ.update(id, updateDto);
    }


    // Get Sale By User
    @Get('search-by-user')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: SaleController.name,
        action: 'read',
        possession: "own"
    })
    @UseInterceptors(new TransformInterceptor(new ViewSaleDto()))
    @ApiOperation({ description: 'Get Sale by User' })
    @ApiCreatedResponse({ type: SaleResponseDto, description: 'Get Sale by User' })
    @HttpCode(200)
    async searcjItemByName(
        @Query() filter: SaleFilterDto,
        @Pager() pagination: IPagination,
        @Query('userId') userId: string) {

        return await this.saleServ.findByUserIdWithPaginate(parseInt(userId), pagination);
    }
    // Get Sale By Date

}
