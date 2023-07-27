import { ApiProperty } from "@nestjs/swagger";

export class RestaurantResponse {
    @ApiProperty({ description: 'The unique identifier of the restaurant, is an uuid', example: 'e02c58f8-6be7-41d6-bbfe-cc4e8c5d5277' })
    id: string;

    @ApiProperty({ description: 'The name of the restaurant', example: 'Restaurant' })
    name: string;
    
    @ApiProperty({ description: 'The url for the logo of the restaurant', example: 'http://route.to.logo' })
    logoUrl: string;
}