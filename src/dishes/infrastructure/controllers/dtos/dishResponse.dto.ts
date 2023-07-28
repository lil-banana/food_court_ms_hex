import { ApiProperty } from "@nestjs/swagger";

export class DishResponse {
    @ApiProperty({ description: 'The unique identifier of the dish, is an uuid', example: 'c84e71b4-8f2c-4355-bc2d-d0bdfd35e269' })
    id: string;
    
    @ApiProperty({ description: 'The name of the dish', example: 'Dish' })
    name: string;
    
    @ApiProperty({ description: 'The price of the dish', example: 1234 })
    price: number;
    
    @ApiProperty({ description: 'The description of the dish', example: 'A dish' })
    description: string;
    
    @ApiProperty({ description: 'The url for the image of the dish', example: 'http://route.to.image' })
    imageUrl: string;
    
    @ApiProperty({ description: 'The category of the dish', example: 'soup' })
    category: string;
}