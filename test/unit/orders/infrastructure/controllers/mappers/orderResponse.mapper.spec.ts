import { Order } from '../../../../../../src/orders/domain/models/order.model';
import { OrderResponseMapper } from '../../../../../../src/orders/infrastructure/controllers/mappers/orderResponse.mapper';
import { VALID_ORDER } from '../../../mocks/order.mock';
import { RestaurantResponse } from '../../../../../../src/restaurants/infrastructure/controllers/dtos/restaurantResponse.dto';
import { VALID_RESTAURANT_RESPONSE } from '../../../../restaurants/mocks/restaurantResponse.mock';
import { OrderResponse } from '../../../../../../src/orders/infrastructure/controllers/dtos/orderResponse.dto';
import { VALID_ORDER_RESPONSE } from '../../../mocks/orderResponse.mock';
import { VALID_ORDER_ITEM_RESPONSE } from '../../../mocks/orderItemResponse.mock';
import { OrderItemResponse } from '../../../../../../src/orders/infrastructure/controllers/dtos/orderItemResponse.dto';

describe('Order Response Mapper', () => {
    let orderResponseMapper: OrderResponseMapper;
    let restaurantResponseMapper: any;
    let orderItemResponseMapper: any;

    beforeEach(() => {
        restaurantResponseMapper = {
            toRestaurantResponse: jest.fn()
        };
        orderItemResponseMapper = {
            toOrderItemResponseList: jest.fn()
        };
        orderResponseMapper = new OrderResponseMapper();
        (orderResponseMapper as any).restaurantResponseMapper = restaurantResponseMapper;
        (orderResponseMapper as any).orderItemResponseMapper = orderItemResponseMapper;
    });

    describe('Success', () => {
        describe('toOrderResponse', () => {
            it('should map Order to OrderResponse', () => {
                const order: Order = VALID_ORDER;
                const restaurantResponse: RestaurantResponse = VALID_RESTAURANT_RESPONSE;
                const orderItemResponseList: OrderItemResponse[] = [VALID_ORDER_ITEM_RESPONSE];
                const expectedOrderResponse: OrderResponse = VALID_ORDER_RESPONSE;

                jest.spyOn(restaurantResponseMapper, 'toRestaurantResponse').mockReturnValue(restaurantResponse);
                jest.spyOn(orderItemResponseMapper, 'toOrderItemResponseList').mockReturnValue(orderItemResponseList);

                const result = orderResponseMapper.toOrderResponse(order);

                expect(result).toEqual(expectedOrderResponse);
            });
        });

        describe('toOrderResponseList', () => {
            it('should map Order List to OrderResponse List', () => {
                const orderList: Order[] = [VALID_ORDER];
                const restaurantResponse: RestaurantResponse = VALID_RESTAURANT_RESPONSE;
                const orderItemResponseList: OrderItemResponse[] = [VALID_ORDER_ITEM_RESPONSE];
                const expectedOrderResponseList: OrderResponse[] = [VALID_ORDER_RESPONSE];

                jest.spyOn(restaurantResponseMapper, 'toRestaurantResponse').mockReturnValue(restaurantResponse);
                jest.spyOn(orderItemResponseMapper, 'toOrderItemResponseList').mockReturnValue(orderItemResponseList);

                const result = orderResponseMapper.toOrderResponseList(orderList);

                expect(result).toEqual(expectedOrderResponseList);
            });
        });
    });
});