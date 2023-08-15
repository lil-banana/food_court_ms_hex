import { VALID_ORDER_ITEM } from '../../../mocks/orderItem.mock';
import { OrderItem } from '../../../../../../src/orders/domain/models/orderItem.model';
import { OrderItemResponseMapper } from '../../../../../../src/orders/infrastructure/controllers/mappers/orderItemResponse.mapper';
import { OrderItemResponse } from '../../../../../../src/orders/infrastructure/controllers/dtos/orderItemResponse.dto';
import { VALID_ORDER_ITEM_RESPONSE } from '../../../mocks/orderItemResponse.mock';
import { DishResponse } from '../../../../../../src/dishes/infrastructure/controllers/dtos/dishResponse.dto';
import { VALID_DISH_RESPONSE } from '../../../../dishes/mocks/dishResponse.mock';

describe('Order Item Response Mapper', () => {
    let orderItemResponseMapper: OrderItemResponseMapper;
    let dishResponseMapper: any;

    beforeEach(() => {
        dishResponseMapper = {
            toDishResponse: jest.fn()
        };
        orderItemResponseMapper = new OrderItemResponseMapper();
        (orderItemResponseMapper as any).dishResponseMapper = dishResponseMapper;
    });

    describe('Success', () => {
        describe('toOrderItemResponse', () => {
            it('should map OrderItem to OrderItemResponse', () => {
                const orderItem: OrderItem = VALID_ORDER_ITEM;
                const dishResponse: DishResponse = VALID_DISH_RESPONSE;
                const expectedOrderItemResponse: OrderItemResponse = VALID_ORDER_ITEM_RESPONSE;

                jest.spyOn(dishResponseMapper, 'toDishResponse').mockReturnValue(dishResponse);

                const result = orderItemResponseMapper.toOrderItemResponse(orderItem);

                expect(result).toEqual(expectedOrderItemResponse);
            });
        });

        describe('toOrderItemResponseList', () => {
            it('should map OrderItem List to OrderItemResponse List', () => {
                const orderItemList: OrderItem[] = [VALID_ORDER_ITEM];
                const dishResponse: DishResponse = VALID_DISH_RESPONSE;
                const expectedOrderItemResponseList: OrderItemResponse[] = [VALID_ORDER_ITEM_RESPONSE];

                jest.spyOn(dishResponseMapper, 'toDishResponse').mockReturnValue(dishResponse);

                const result = orderItemResponseMapper.toOrderItemResponseList(orderItemList);

                expect(result).toEqual(expectedOrderItemResponseList);
            });
        });
    });
});