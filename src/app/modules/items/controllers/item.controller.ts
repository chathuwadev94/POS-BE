import { Body, Controller, Get, HttpCode, Inject, Param, Post, Put, Query, UseGuards, UseInterceptors, Delete } from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { TransformInterceptor } from 'src/app/core/interceptors/transform.interceptor';
import { ViewItemDto } from '../dtos/view-item.dto';
import { ResponseItemDto } from '../dtos/response-item.dto';
import { CreateItemDto, UpdateItemDto } from '../dtos/item.dto';
import { ItemFilterDto } from '../dtos/filter-item.dto';
import { Pager } from 'src/app/core/decorators/page.decorator';
import { IPagination } from 'src/app/core/interfaces/page.interface';

@Controller('item')
@ApiTags('Item')
@ApiBearerAuth()
export class ItemController {

    constructor(
        @Inject(ItemService.name)
        private readonly itemServ: ItemService
    ) { }

    // Create Item
    @Post()
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: ItemController.name,
        action: 'create',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewItemDto()))
    @ApiOperation({ description: 'Create Item' })
    @ApiCreatedResponse({ type: ResponseItemDto, description: 'Create Item' })
    @ApiBody({ type: CreateItemDto })
    @HttpCode(201)
    async create(@Body() createDto: CreateItemDto) {
        return await this.itemServ.create(createDto);
    }

    // Get All Items
    @Get()
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: ItemController.name,
        action: 'read',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewItemDto()))
    @ApiOperation({ description: 'Get All Items' })
    @ApiCreatedResponse({ type: [ResponseItemDto], description: 'Get All Items' })
    async getAllUsers(
        @Query() filter: ItemFilterDto,
        @Pager() page: IPagination
    ) {
        return await this.itemServ.findAllwithPagination(page);
    }

      // Search Item by Name
      @Get('search-by-name')
      @UseGuards(JwtAuthGuard, ACGuard)
      @UseRoles({
          resource: ItemController.name,
          action: 'read',
          possession: "own"
      })
      @UseInterceptors(new TransformInterceptor(new ViewItemDto()))
      @ApiOperation({ description: 'Get items By Name' })
      @ApiCreatedResponse({ type: ResponseItemDto, description: 'Get items By Name' })
      @HttpCode(200)
      async searcjItemByName(
          @Query() filter: ItemFilterDto,
          @Pager() pagination: IPagination,
          @Query('name') name: string) {
  
          return await this.itemServ.searchItemByName(name, pagination);
      }
  
      // Search Item By Barcode
      @Get('search-by-barcode')
      @UseGuards(JwtAuthGuard, ACGuard)
      @UseRoles({
          resource: ItemController.name,
          action: 'read',
          possession: "own"
      })
      @UseInterceptors(new TransformInterceptor(new ViewItemDto()))
      @ApiOperation({ description: 'Get items By Barcode' })
      @ApiCreatedResponse({ type: ResponseItemDto, description: 'Get items By Barcode' })
      @HttpCode(200)
      async searcjItemByBarcode(
          @Query() filter: ItemFilterDto,
          @Pager() pagination: IPagination,
          @Query('bcode') bcode: string) {
  
          return await this.itemServ.searchItemByBarcode(bcode, pagination);
      }
  

    // Get Item by Id
    @Get(':id')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: ItemController.name,
        action: 'read',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewItemDto()))
    @ApiOperation({ description: 'Get  Item by Id' })
    @ApiCreatedResponse({ type: ResponseItemDto, description: 'Get Item by Id' })
    async getUserById(@Param('id') id: number) {
        return await this.itemServ.findById(id);
    }

    // Update Item
    @Put(':id')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: ItemController.name,
        action: 'update',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewItemDto))
    @ApiOperation({ description: 'Update Item' })
    @ApiCreatedResponse({ type: ResponseItemDto, description: 'Update Item' })
    @ApiBody({ type: UpdateItemDto })
    @HttpCode(200)
    async updateUser(@Param('id') id: number, @Body() updateDto: UpdateItemDto) {
        return await this.itemServ.update(id, updateDto);
    }

    // Remove Item
    @Delete(':id')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: ItemController.name,
        action: 'delete',
        possession: "own",
    })
    @UseInterceptors(new TransformInterceptor(new ViewItemDto))
    @ApiOperation({ description: "Delete Item" })
    @ApiCreatedResponse({ type: ResponseItemDto, description: "Delete Item" })
    async delete(
        @Param() id: number,
    ): Promise<boolean> {
        return true
    }

    // Get Item By stock

    // Get Items by Category
    @Get('item-category')
    @UseGuards(JwtAuthGuard, ACGuard)
    @UseRoles({
        resource: ItemController.name,
        action: 'read',
        possession: "own"
    })
    @UseInterceptors(new TransformInterceptor(new ViewItemDto()))
    @ApiOperation({ description: 'Get items By Category' })
    @ApiCreatedResponse({ type: ResponseItemDto, description: 'Get items By Category' })
    @HttpCode(200)
    async getUserByNIC(
        @Query() filter: ItemFilterDto,
        @Pager() pagination: IPagination,
        @Query('category') catId: string) {

        return await this.itemServ.finditemsByCategory(parseInt(catId), pagination);
    }

  
}
