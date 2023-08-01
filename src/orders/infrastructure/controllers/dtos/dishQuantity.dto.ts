import { IsInt, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DishQuantityDto {
    @ApiProperty({ description: 'The unique identifier of the dish, is an uuid  ', example: '4936d4bb-ce54-41e9-bde8-ce9a803cb00a' })
    @IsString()
    dishId: string;
  
    @ApiProperty({ description: 'The quantity of the dish', example: 2 })
    @IsInt()
    @Min(1)
    quantity: number;
  }