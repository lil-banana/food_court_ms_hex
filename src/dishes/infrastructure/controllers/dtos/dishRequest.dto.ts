import { ApiProperty } from "@nestjs/swagger";

export class DishRequest {
    @ApiProperty({ description: 'The name of the dish', example: 'Dish' })
    name: string;
    
    @ApiProperty({ description: 'The price of the dish', example: 1234 })
    price: number;
    
    @ApiProperty({ description: 'The description of the dish', example: 'Street 1' })
    description: string;
    
    @ApiProperty({ description: 'The url for the image of the dish', example: 'http://route.to.image' })
    imageUrl: string;
    
    @ApiProperty({ description: 'The unique identifier of the category of the dish, is an uuid', example: '0a2ecc9f-e14f-46b0-86e2-14459e5041c8' })
    categoryId: string;
}