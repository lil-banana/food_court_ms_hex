import { VALID_DISH_RESPONSE } from '../../dishes/mocks/dishResponse.mock';
import { OrderItemResponse } from '../../../../src/orders/infrastructure/controllers/dtos/orderItemResponse.dto';
import { VALID_DISH_QUANTITY } from './dishQuantity.mock';

export const VALID_ORDER_ITEM_RESPONSE: OrderItemResponse = {
    dish: VALID_DISH_RESPONSE,
    quantity: VALID_DISH_QUANTITY.quantity
};