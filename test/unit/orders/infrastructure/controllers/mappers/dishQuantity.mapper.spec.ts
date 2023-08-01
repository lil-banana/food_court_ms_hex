import { DishQuantityMapper } from '../../../../../../src/orders/infrastructure/controllers/mappers/dishQuantity.mapper';
import { VALID_ORDER_ITEM_NO_ID } from '../../../mocks/orderItem.mock';
import { DishQuantityDto } from '../../../../../../src/orders/infrastructure/controllers/dtos/dishQuantity.dto';
import { OrderItem } from '../../../../../../src/orders/domain/models/orderItem.model';
import { VALID_DISH_QUANTITY } from '../../../mocks/dishQuantity.mock';

describe('Dish Quantity Mapper', () => {
    let dishQuantityMapper: DishQuantityMapper;

    beforeEach(() => {
        dishQuantityMapper = new DishQuantityMapper();
    });

    describe('Success', () => {
        describe('toOrderItem', () => {
            it('should map DishQuantity to OrderItem', () => {
                const dishQuantity: DishQuantityDto = VALID_DISH_QUANTITY;
                const expectedOrderItem: OrderItem = VALID_ORDER_ITEM_NO_ID;
    
                const orderItem = dishQuantityMapper.toOrderItem(dishQuantity);

                expect(orderItem).toEqual(expectedOrderItem);
            });
        });

        describe('toOrderItemList', () => {
            it('should map DishQuantityList to OrderItemList', () => {
                const dishQuantityList: DishQuantityDto[] = [ VALID_DISH_QUANTITY ];
                const expectedOrderItemList: OrderItem[] = [ VALID_ORDER_ITEM_NO_ID ];
    
                const orderItemList = dishQuantityMapper.toOrderItemList(dishQuantityList);

                expect(orderItemList).toEqual(expectedOrderItemList);
            });
        });
    });
});