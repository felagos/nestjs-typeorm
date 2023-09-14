import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  limit?: number;

  @IsPositive()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  offset?: number;
}
