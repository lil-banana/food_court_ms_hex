import { RestaurantResponseMapper } from '../../../../restaurants/infrastructure/controllers/mappers/restaurantResponse.mapper';
import { Order } from '../../../domain/models/order.model';
import { OrderResponse } from '../dtos/orderResponse.dto';
import { OrderItemResponseMapper } from './orderItemResponse.mapper';

export class OrderResponseMapper {
    private readonly restaurantResponseMapper = new RestaurantResponseMapper();
    private readonly orderItemResponseMapper = new OrderItemResponseMapper();

    toOrderResponse(order: Order): OrderResponse {
        const orderResponse: OrderResponse = new OrderResponse();
        orderResponse.id = order.id;
        orderResponse.clientId = order.clientId;
        orderResponse.restaurant = this.restaurantResponseMapper.toRestaurantResponse(order.restaurant);
        orderResponse.items = this.orderItemResponseMapper.toOrderItemResponseList(order.items);
        orderResponse.status = order.status;
        return orderResponse;
    }

    toOrderResponseList(orderList: Order[]): OrderResponse[] {
        return orderList.map(order => this.toOrderResponse(order));
    }
}