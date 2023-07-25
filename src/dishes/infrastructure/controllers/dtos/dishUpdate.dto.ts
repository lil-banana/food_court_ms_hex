import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class DishUpdate {
    @IsOptional()
    @IsNumber()
    @ApiProperty({ description: 'The price of the dish', example: 1234 })
    price?: number;
    
    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'The description of the dish', example: 'Street 1' })
    description?: string;
}