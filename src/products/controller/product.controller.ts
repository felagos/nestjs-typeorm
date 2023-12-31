import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CreateProductDto } from '../dto/create-product.dto';
import { FilterProductDto } from '../dto/filter-product.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body);
  }

  @Get()
  getAll(@Query() pagination: PaginationDto) {
    return this.productService.findAll(pagination);
  }

  @Get(':id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.findOne(id);
  }

  @Get('/filter')
  filterProduct(@Query() filter: FilterProductDto) {
    return this.productService.filterProduct(filter);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id', ParseUUIDPipe) id: string) {
    this.productService.deleteById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: UpdateProductDto,
  ) {
    this.productService.updateProduct(id, product);
  }
}
