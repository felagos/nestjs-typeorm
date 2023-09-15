import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class FilterProductDto {
  @IsString()
  term?: string;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  gender?: string;
}
