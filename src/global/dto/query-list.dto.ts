import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import config from 'src/config/config';

@Exclude()
export class QueryListDto {
  @Expose()
  @ApiProperty({ example: 'currentPage', required: false })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  public page: number = 1;

  @Expose()
  @ApiProperty({ example: 'perPage', required: false })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  public perPage: number = 10;

  @Expose()
  @ApiProperty({ example: '"ASC" | "DESC"', required: false })
  @IsString()
  @IsIn(config.SORT_TYPE.value)
  @IsOptional()
  public sort: string;

  @Expose()
  @ApiProperty({ example: 'keyword', required: false })
  @IsString()
  @IsOptional()
  public keyword: string;
}
