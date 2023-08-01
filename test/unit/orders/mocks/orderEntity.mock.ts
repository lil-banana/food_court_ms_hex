import { OrderEntity } from '../../../../src/orders/infrastructure/persistence/typeorm/entities/order.entity';
import { VALID_ORDER } from './order.mock';
import { VALID_RESTAURANT_ENTITY, VALID_RESTAURANT_ENTITY_ONLY_ID } from '../../restaurants/mocks/restaurantEntity.mock';
import { VALID_ORDER_ITEM_ENTITY, VALID_ORDER_ITEM_ENTITY_NO_ID } from './orderItemEntity.mock';

export const VALID_ORDER_ENTITY: OrderEntity = {
    id: VALID_ORDER.id,
    clientId: VALID_ORDER.clientId,
    status: VALID_ORDER.status,
    restaurant: VALID_RESTAURANT_ENTITY,
    orderItems: [ VALID_ORDER_ITEM_ENTITY ],
    createdAt: undefined,
    updatedAt: undefined
}

export const VALID_ORDER_ENTITY_NO_ID: OrderEntity = {
    id: undefined,
    clientId: VALID_ORDER.clientId,
    status: VALID_ORDER.status,
    restaurant: VALID_RESTAURANT_ENTITY_ONLY_ID,
    orderItems: [ VALID_ORDER_ITEM_ENTITY_NO_ID ],
    createdAt: undefined,
    updatedAt: undefined
}