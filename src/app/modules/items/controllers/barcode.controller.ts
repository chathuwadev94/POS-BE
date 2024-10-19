import { Controller, Inject, Post, UseGuards, UseInterceptors, Get, Param, Put, Body, Delete } from '@nestjs/common';
import { BarcodeService } from '../services/barcode.service';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { TransformInterceptor } from 'src/app/core/interceptors/transform.interceptor';
import { ViewBarcodeDto } from '../dtos/view-barcode.dto';
import { CreateBarcodeDto, UpdateBarcodeDto } from '../dtos/barcode.dto';
import { IBarcode } from '../interfaces/barcode.interface';
import { ResponseBarcodeDto } from '../dtos/response-barcode.dto';

@Controller('barcode')
@ApiTags('Barcode')
@ApiBearerAuth()
export class BarcodeController {

    constructor(
        @Inject(BarcodeService.name)
        private readonly barcodeServ: BarcodeService
    ) { }

    // Create Barcode
    @Post()
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: BarcodeController.name,
        action: 'create',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewBarcodeDto))
    @ApiOperation({ description: 'Create Barcode' })
    @ApiCreatedResponse({ type: ResponseBarcodeDto, description: 'Create Barcode' })
    @ApiBody({ type: CreateBarcodeDto })
    async create(createDto: CreateBarcodeDto): Promise<IBarcode> {
        return await this.barcodeServ.create(createDto);
    }

    // Get All Barcodes
    // @Get()
    // @UseGuards(JwtAuthGuard, ACGuard)
    // @UseInterceptors(new TransformInterceptor(new ViewBarcodeDto))
    // @ApiOperation({ description: "Get all categories" })
    // @ApiCreatedResponse({ type: ResponseBarcodeDto, description: "Get all categories" })
    // async getAll(
    //     @Query() filter: BarcodeFilterDto,
    //     @Pager() page: IPagination
    // ): Promise<IPaginatedEntity<IBarcode>> {
    //     return await this.barcodeServ.(page);
    // }


    // Get Barcode by Id
    @Get(':id')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: BarcodeController.name,
        action: 'read',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewBarcodeDto))
    @ApiOperation({ description: "Get Barcode by id" })
    @ApiCreatedResponse({ type: ResponseBarcodeDto, description: "Get Barcode by id" })
    async getbyId(
        @Param() id: number
    ): Promise<IBarcode> {
        return await this.barcodeServ.findById(id);
    }

    // Update Barcode
    @Put(':id')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: BarcodeController.name,
        action: 'update',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewBarcodeDto))
    @ApiOperation({ description: "Update Barcode" })
    @ApiCreatedResponse({ type: ResponseBarcodeDto, description: "Update Barcode" })
    async update(
        @Param() id: number,
        @Body() update: UpdateBarcodeDto
    ): Promise<IBarcode> {
        return await this.barcodeServ.update(id, update);
    }

    // Remove Barcode
    @Delete(':id')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: BarcodeController.name,
        action: 'delete',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewBarcodeDto))
    @ApiOperation({ description: "Delete Barcode" })
    @ApiCreatedResponse({ type: ResponseBarcodeDto, description: "Delete Barcode" })
    async delete(
        @Param() id: number,
    ): Promise<boolean> {
        return await this.barcodeServ.delete(id);
    }
    // Find All Barcodes by Item
}
