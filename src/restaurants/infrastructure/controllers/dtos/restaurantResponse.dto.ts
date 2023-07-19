import { ApiProperty } from "@nestjs/swagger";

export class RestaurantResponse {
    @ApiProperty({ description: 'The unique identifier of the restaurant, is an uuid', example: '9509e5c9-ea15-4fe3-b66a-7e0310d2e948' })
    id: string;
    
    @ApiProperty({ description: 'The name of the restaurant', example: 'Restaurant' })
    name: string;
    
    @ApiProperty({ description: 'The nit of the restaurant', example: '1234567890' })
    nit: string;
    
    @ApiProperty({ description: 'The address of the restaurant', example: 'Street 1' })
    address: string;
    
    @ApiProperty({ description: 'The telephone number of the restaurant', example: '+1234567890' })
    telephoneNumber: string;
    
    @ApiProperty({ description: 'The url for the logo of the restaurant', example: 'http://route.to.logo' })
    logoUrl: string;
    
    @ApiProperty({ description: 'The unique identifier for the owner of the restaurant, is an uuid', example: 'c8d13fa5-ab1f-49d6-a569-8adf09383189' })
    ownerId: string;
}