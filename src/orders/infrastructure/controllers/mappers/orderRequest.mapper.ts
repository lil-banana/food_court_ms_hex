import { Order } from '../../../domain/models/order.model';
import { OrderRequest } from '../dtos/orderRequest.dto';
import { Restaurant } from '../../../../restaurants/domain/models/restaurant.model';
import { DishQuantityMapper } from './dishQuantity.mapper';

export class OrderRequestMapper {
    private readonly dishQuantityMapper: DishQuantityMapper = new DishQuantityMapper();

    toOrder(orderRequest: OrderRequest, clientId: string): Order {
        const order: Order = new Order(
            undefined,
            clientId,
            new Restaurant(orderRequest.restaurantId, undefined, undefined, undefined),
            this.dishQuantityMapper.toOrderItemList(orderRequest.dishes),
            'pending'
        );
        return order;
    }
}