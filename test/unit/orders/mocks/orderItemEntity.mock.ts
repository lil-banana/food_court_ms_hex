import { VALID_DISH_ENTITY_ONLY_ID } from '../../dishes/mocks/dishEntity.mock';
import { OrderItemEntity } from '../../../../src/orders/infrastructure/persistence/typeorm/entities/orderItem.entity';
import { VALID_ORDER_ITEM } from './orderItem.mock';

export const VALID_ORDER_ITEM_ENTITY: OrderItemEntity = {
    id: VALID_ORDER_ITEM.id,
    quantity: VALID_ORDER_ITEM.quantity,
    dish: VALID_DISH_ENTITY_ONLY_ID,
    order: undefined,
    createdAt: undefined,
    updatedAt: undefined
}

export const VALID_ORDER_ITEM_ENTITY_NO_ID: OrderItemEntity = {
    id: undefined,
    quantity: VALID_ORDER_ITEM.quantity,
    dish: VALID_DISH_ENTITY_ONLY_ID,
    order: undefined,
    createdAt: undefined,
    updatedAt: undefined
}