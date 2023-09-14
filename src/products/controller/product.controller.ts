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
  Query,
} from '@nestjs/common';

import { CreateProductDto } from '../dto/create-product.dto';
import { PaginationDto } from '../dto/pagination.dto';
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

  @Get(':term')
  getById(@Param('term', ParseUUIDPipe) term: string) {
    return this.productService.getOne(term);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id', ParseUUIDPipe) id: string) {
    this.productService.deleteById(id);
  }
}
