import { VALID_RESTAURANT_RESPONSE } from '../../restaurants/mocks/restaurantResponse.mock';
import { OrderResponse } from '../../../../src/orders/infrastructure/controllers/dtos/orderResponse.dto';
import { VALID_ORDER } from './order.mock';
import { VALID_ORDER_ITEM_RESPONSE } from './orderItemResponse.mock';

export const VALID_ORDER_RESPONSE: OrderResponse = {
    id: VALID_ORDER.id,
    clientId: VALID_ORDER.clientId,
    restaurant: VALID_RESTAURANT_RESPONSE,
    items: [ VALID_ORDER_ITEM_RESPONSE ],
    status: VALID_ORDER.status
};