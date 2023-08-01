import { OrderItem } from '../../../../src/orders/domain/models/orderItem.model';
import { VALID_DISH, VALID_DISH_ONLY_ID } from '../../dishes/mocks/dish.mock';

export const VALID_ORDER_ITEM = new OrderItem(
    '549a6ab2-5cf8-4b68-9b71-9bc45a1bb8af',
    VALID_DISH,
    3
);

export const VALID_ORDER_ITEM_NO_ID = new OrderItem(
    undefined,
    VALID_DISH_ONLY_ID,
    VALID_ORDER_ITEM.quantity
);