import { ApiProperty } from "@nestjs/swagger";

export class RestaurantRequest {
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
    
    @ApiProperty({ description: 'The unique identifier of the owner of the restaurant, is an uuid', example: 'c8d13fa5-ab1f-49d6-a569-8adf09383189' })
    ownerId: string;
}