import { Order } from '../../../../../../../src/orders/domain/models/order.model';
import { OrderEntity } from '../../../../../../../src/orders/infrastructure/persistence/typeorm/entities/order.entity';
import { OrderEntityMapper } from '../../../../../../../src/orders/infrastructure/persistence/typeorm/mappers/orderEntity.mapper';
import { VALID_ORDER_ENTITY, VALID_ORDER_ENTITY_NO_ID } from '../../../../mocks/orderEntity.mock';
import { Restaurant } from '../../../../../../../src/restaurants/domain/models/restaurant.model';
import { VALID_RESTAURANT } from '../../../../../restaurants/mocks/restaurant.mock';
import { VALID_ORDER, VALID_ORDER_NO_ID } from '../../../../mocks/order.mock';
import { VALID_RESTAURANT_ENTITY_NO_ID, VALID_RESTAURANT_ENTITY_ONLY_ID } from '../../../../../restaurants/mocks/restaurantEntity.mock';
import { RestaurantEntity } from '../../../../../../../src/restaurants/infrastructure/persistence/typeorm/entities/restaurant.entity';
import { VALID_ORDER_ITEM } from '../../../../mocks/orderItem.mock';
import { OrderItem } from '../../../../../../../src/orders/domain/models/orderItem.model';
import { VALID_ORDER_ITEM_ENTITY_NO_ID } from '../../../../mocks/orderItemEntity.mock';
import { OrderItemEntity } from '../../../../../../../src/orders/infrastructure/persistence/typeorm/entities/orderItem.entity';

describe('Order Entity Mapper', () => {
    let orderEntityMapper: OrderEntityMapper;
    let orderItemEntityMapper: any;
    let restaurantEntityMapper: any;

    beforeEach(() => {
        restaurantEntityMapper = {
            toRestaurant: jest.fn(),
            toRestaurantEntity: jest.fn()
        };
        orderItemEntityMapper = {
            toOrderItemList: jest.fn(),
            toOrderItemEntityList: jest.fn()
        };
        orderEntityMapper = new OrderEntityMapper();
        (orderEntityMapper as any).restaurantEntityMapper = restaurantEntityMapper;
        (orderEntityMapper as any).orderItemEntityMapper = orderItemEntityMapper;
    });

    describe('toOrder', () => {
        it('should map OrderEntity to Order', () => {
            const orderEntity: OrderEntity = VALID_ORDER_ENTITY;
            const restaurant: Restaurant = VALID_RESTAURANT;
            const orderItemList: OrderItem[] = [ VALID_ORDER_ITEM ];
            const expectedOrder: Order = VALID_ORDER;
      
            jest.spyOn(restaurantEntityMapper, 'toRestaurant').mockReturnValue(restaurant);
            jest.spyOn(orderItemEntityMapper, 'toOrderItemList').mockReturnValue(orderItemList);

            const order = orderEntityMapper.toOrder(orderEntity);

            expect(order).toEqual(expectedOrder);
            expect(restaurantEntityMapper.toRestaurant).toHaveBeenCalledWith(orderEntity.restaurant);
        });
    });

    describe('toOrderList', () => {
        it('should map OrderEntityList to OrderList', () => {
            const orderEntityList: OrderEntity[] = [ VALID_ORDER_ENTITY ];
            const restaurant: Restaurant = VALID_RESTAURANT;
            const orderItemList: OrderItem[] = [ VALID_ORDER_ITEM ];
            const expectedOrderList: Order[] = [ VALID_ORDER ];
      
            jest.spyOn(restaurantEntityMapper, 'toRestaurant').mockReturnValue(restaurant);
            jest.spyOn(orderItemEntityMapper, 'toOrderItemList').mockReturnValue(orderItemList);

            const orderList = orderEntityMapper.toOrderList(orderEntityList);

            expect(orderList).toEqual(expectedOrderList);
        });
    });

    describe('toOrderEntity', () => {
        it('should map OrderItem to OrderEntity', () => {
            const order: Order = VALID_ORDER_NO_ID;
            const restaurantEntity: RestaurantEntity = VALID_RESTAURANT_ENTITY_ONLY_ID;
            const orderItemEntityList: OrderItemEntity[] = [ VALID_ORDER_ITEM_ENTITY_NO_ID ];
            const expectedOrderEntity: OrderEntity = VALID_ORDER_ENTITY_NO_ID;
            
            jest.spyOn(restaurantEntityMapper, 'toRestaurantEntity').mockReturnValue(restaurantEntity);
            jest.spyOn(orderItemEntityMapper, 'toOrderItemEntityList').mockReturnValue(orderItemEntityList);

            const orderEntity = orderEntityMapper.toOrderEntity(order);

            expect(orderEntity).toEqual(expectedOrderEntity);
            expect(restaurantEntityMapper.toRestaurantEntity).toHaveBeenCalledWith(order.restaurant);
        });
    });
});