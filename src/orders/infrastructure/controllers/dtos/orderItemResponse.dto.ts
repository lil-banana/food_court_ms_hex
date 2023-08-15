import { ApiProperty } from "@nestjs/swagger";
import { DishResponse } from "../../../../dishes/infrastructure/controllers/dtos/dishResponse.dto";

export class OrderItemResponse {
    @ApiProperty({ description: 'A dish'})
    dish: DishResponse;
    
    @ApiProperty({ description: 'The quantity of the dish', example: 2 })
    quantity: number;
}