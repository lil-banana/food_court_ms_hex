import { ApiProperty } from "@nestjs/swagger";
import { RestaurantResponse } from "../../../../restaurants/infrastructure/controllers/dtos/restaurantResponse.dto";
import { OrderItemResponse } from "./orderItemResponse.dto";

export class OrderResponse {
    @ApiProperty({ description: 'The unique identifier of the order, is an uuid', example: '9abdb8da-5dc3-4578-882a-8a03b85bf125' })
    id: string;
    
    @ApiProperty({ description: 'The unique identifier of the client who placed the order, is an uuid', example: 'a46f2477-c140-428a-8f44-f52508bafc97' })
    clientId: string;
    
    @ApiProperty({ description: 'The restaurant where the order is placed' })
    restaurant: RestaurantResponse;
    
    @ApiProperty({ description: 'The list of order items' })
    items: OrderItemResponse[];
    
    @ApiProperty({ description: 'The status of the order', example: 'pending' })
    status: string;
}