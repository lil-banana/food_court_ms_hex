import { Order } from '../../../../src/orders/domain/models/order.model';
import { VALID_RESTAURANT, VALID_RESTAURANT_ONLY_ID } from '../../restaurants/mocks/restaurant.mock';
import { VALID_ORDER_ITEM, VALID_ORDER_ITEM_NO_ID } from './orderItem.mock';

export const VALID_ORDER = new Order(
    '7de33793-b61d-4d49-8407-78d32d0fb011',
    '15808e3e-5ecc-4d6b-b03c-8ab7a274f4dc',
    VALID_RESTAURANT,
    [VALID_ORDER_ITEM],
    'pending'
);

export const VALID_ORDER_NO_ID = new Order(
    undefined,
    VALID_ORDER.clientId,
    VALID_RESTAURANT_ONLY_ID,
    [ VALID_ORDER_ITEM_NO_ID ],
    'pending'
);