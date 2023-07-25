import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class DishRequest {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'The name of the dish', example: 'Dish' })
    name: string;
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'The price of the dish', example: 1234 })
    price: number;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'The description of the dish', example: 'Street 1' })
    description: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'The url for the image of the dish', example: 'http://route.to.image' })
    imageUrl: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'The unique identifier of the category of the dish, is an uuid', example: '0a2ecc9f-e14f-46b0-86e2-14459e5041c8' })
    categoryId: string;
}