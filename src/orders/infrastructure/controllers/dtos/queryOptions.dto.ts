import { IsNumber, Min, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class QueryOptionsDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Order status', example: 'pending', required: true })
    status: string;

    @Transform(/* istanbul ignore next */({ value }) => Number(value))
    @IsNumber()
    @Min(1)
    @IsOptional()
    @ApiProperty({ description: 'Page number', example: 1, minimum: 1, default: 1, required: false })
    page?: number;

    @Transform(/* istanbul ignore next */({ value }) => Number(value))
    @IsNumber()
    @Min(1)
    @IsOptional()
    @ApiProperty({ description: 'Number of items per page', example: 10, minimum: 1, default: 10, required: false })
    limit?: number;
}