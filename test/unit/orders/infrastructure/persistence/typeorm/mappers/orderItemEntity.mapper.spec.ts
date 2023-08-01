import { OrderItem } from '../../../../../../../src/orders/domain/models/orderItem.model';
import { OrderItemEntity } from '../../../../../../../src/orders/infrastructure/persistence/typeorm/entities/orderItem.entity';
import { OrderItemEntityMapper } from '../../../../../../../src/orders/infrastructure/persistence/typeorm/mappers/orderItemEntity.mapper';
import { VALID_ORDER_ITEM_ENTITY, VALID_ORDER_ITEM_ENTITY_NO_ID } from '../../../../mocks/orderItemEntity.mock';
import { VALID_ORDER_ITEM, VALID_ORDER_ITEM_NO_ID } from '../../../../mocks/orderItem.mock';
import { Dish } from '../../../../../../../src/dishes/domain/models/dish.model';
import { VALID_DISH } from '../../../../../dishes/mocks/dish.mock';
import { VALID_DISH_ENTITY_ONLY_ID } from '../../../../../dishes/mocks/dishEntity.mock';
import { DishEntity } from '../../../../../../../src/dishes/infrastructure/persistence/typeorm/entities/dish.entity';

describe('Order Item Entity Mapper', () => {
    let orderItemEntityMapper: OrderItemEntityMapper;
    let dishEntityMapper: any;

    beforeEach(() => {
        dishEntityMapper = {
            toDish: jest.fn(),
            toDishEntity: jest.fn(),
        };
        orderItemEntityMapper = new OrderItemEntityMapper();
        (orderItemEntityMapper as any).dishEntityMapper = dishEntityMapper;
    });

    describe('toOrderItem', () => {
        it('should map OrderItemEntity to OrderItem', () => {
            const orderItemEntity: OrderItemEntity = VALID_ORDER_ITEM_ENTITY;
            const dish: Dish = VALID_DISH;
            const expectedOrderItem: OrderItem = VALID_ORDER_ITEM;
      
            jest.spyOn(dishEntityMapper, 'toDish').mockReturnValue(dish);

            const orderItem = orderItemEntityMapper.toOrderItem(orderItemEntity);

            expect(orderItem).toEqual(expectedOrderItem);
            expect(dishEntityMapper.toDish).toHaveBeenCalledWith(orderItemEntity.dish);
        });
    });

    describe('toOrderItemList', () => {
        it('should map OrderItemEntityList to OrderItemList', () => {
            const orderItemEntityList: OrderItemEntity[] = [ VALID_ORDER_ITEM_ENTITY ];
            const dish: Dish = VALID_DISH;
            const expectedOrderItemList: OrderItem[] = [ VALID_ORDER_ITEM ];
      
            jest.spyOn(dishEntityMapper, 'toDish').mockReturnValue(dish);

            const orderItemList = orderItemEntityMapper.toOrderItemList(orderItemEntityList);

            expect(orderItemList).toEqual(expectedOrderItemList);
        });
    });

    describe('toOrderItemEntity', () => {
        it('should map OrderItem to OrderItemEntity', () => {
            const orderItem: OrderItem = VALID_ORDER_ITEM_NO_ID;
            const dishEntity: DishEntity = VALID_DISH_ENTITY_ONLY_ID;
            const expectedOrderItemEntity: OrderItemEntity = VALID_ORDER_ITEM_ENTITY_NO_ID;
            
            jest.spyOn(dishEntityMapper, 'toDishEntity').mockReturnValue(dishEntity);

            const orderItemEntity = orderItemEntityMapper.toOrderItemEntity(orderItem);

            expect(orderItemEntity).toEqual(expectedOrderItemEntity);
            expect(dishEntityMapper.toDishEntity).toHaveBeenCalledWith(orderItem.dish);
        });
    });

    describe('toOrderItemEntityList', () => {
        it('should map OrderItemList to OrderItemEntityList', () => {
            const orderItemList: OrderItem[] = [ VALID_ORDER_ITEM_NO_ID ];
            const dishEntity: DishEntity = VALID_DISH_ENTITY_ONLY_ID;
            const expectedOrderItemEntityList: OrderItemEntity[] = [ VALID_ORDER_ITEM_ENTITY_NO_ID ];
      
            jest.spyOn(dishEntityMapper, 'toDishEntity').mockReturnValue(dishEntity);

            const orderItemEntityList = orderItemEntityMapper.toOrderItemEntityList(orderItemList);

            expect(orderItemEntityList).toEqual(expectedOrderItemEntityList);
        });
    });
});