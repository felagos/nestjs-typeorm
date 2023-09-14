import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  description: string;

  @IsString()
  slug: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @IsString({ each: true })
  @IsArray()
  size: string[];

  @IsString()
  @IsIn(['men', 'women', 'kids'])
  gender: string;
}
