import { ApiProperty } from "@nestjs/swagger";

export class RestaurantIdDto {
    @ApiProperty({ description: 'The unique identifier of the restaurant, is an uuid', example: '9509e5c9-ea15-4fe3-b66a-7e0310d2e948' })
    id: string;
}