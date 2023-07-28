import { IsNumber, Min, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class QueryOptionsDto {    
    @Transform(/* istanbul ignore next */ ({ value }) => Number(value))
    @IsNumber()
    @Min(1)
    @IsOptional()
    @ApiProperty({ description: 'Page number', example: 1, minimum: 1, default: 1, required: false })
    page?: number;
    
    @Transform(/* istanbul ignore next */ ({ value }) => Number(value))
    @IsNumber()
    @Min(1)
    @IsOptional()
    @ApiProperty({ description: 'Number of items per page', example: 10, minimum: 1, default: 10, required: false })
    limit?: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Dish category', example: 'soup', required: false })
    category?: string;
}