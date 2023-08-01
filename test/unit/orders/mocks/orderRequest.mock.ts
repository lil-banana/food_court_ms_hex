import { OrderRequest } from '../../../../src/orders/infrastructure/controllers/dtos/orderRequest.dto';
import { VALID_ORDER } from './order.mock';
import { VALID_ORDER_ITEM } from './orderItem.mock';

export const VALID_ORDER_REQUEST: OrderRequest = {
    restaurantId: VALID_ORDER.restaurant.id,
    dishes: [{
        dishId: VALID_ORDER_ITEM.dish.id,
        quantity: VALID_ORDER_ITEM.quantity
    }]
}