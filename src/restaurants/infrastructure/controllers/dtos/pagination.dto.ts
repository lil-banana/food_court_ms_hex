import { IsNumber, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
    @IsNumber()
    @Min(1)
    @IsOptional()
    @ApiProperty({ description: 'Page number', example: 1, minimum: 1, default: 1, required: false })
    page?: number;
  
    @IsNumber()
    @Min(1)
    @IsOptional()
    @ApiProperty({ description: 'Number of items per page', example: 10, minimum: 1, default: 10, required: false })
    limit?: number;
}