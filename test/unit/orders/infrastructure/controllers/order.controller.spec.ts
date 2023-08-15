import { OrderController } from '../../../../../src/orders/infrastructure/controllers/order.controller';
import { OrderRequest } from '../../../../../src/orders/infrastructure/controllers/dtos/orderRequest.dto';
import { OrderIdDto } from '../../../../../src/orders/infrastructure/controllers/dtos/orderIdDto.dto';
import { Order } from '../../../../../src/orders/domain/models/order.model';
import { VALID_ORDER } from '../../mocks/order.mock';
import { VALID_ORDER_REQUEST } from '../../mocks/orderRequest.mock';
import { VALID_ORDER_ID_DTO } from '../../mocks/orderIdDto.mock';
import { QUERY_OPTIONS } from '../../mocks/queryOptionsDto.mock';
import { QueryOptionsDto } from '../../../../../src/orders/infrastructure/controllers/dtos/queryOptions.dto';
import { VALID_ORDER_RESPONSE } from '../../mocks/orderResponse.mock';
import { OrderResponse } from '../../../../../src/orders/infrastructure/controllers/dtos/orderResponse.dto';
import { VALID_RESTAURANT } from '../../../restaurants/mocks/restaurant.mock';

describe('Order Controller', () => {
    let orderController: OrderController;
    let createOrderUseCase: any;
    let getOrdersUseCase: any;
    let orderRequestMapper: any;
    let orderIdDtoMapper: any;
    let queryOptionsDtoMapper: any;
    let orderResponseMapper: any;

    beforeEach(() => {
        createOrderUseCase = {
            saveOrder: jest.fn(),
        };
        getOrdersUseCase = {
            getOrders: jest.fn(),
        };
        orderRequestMapper = {
            toOrder: jest.fn(),
        };
        orderIdDtoMapper = {
            toOrderIdDto: jest.fn(),
        };
        queryOptionsDtoMapper = {
            toQueryOptions: jest.fn(),
        };
        orderResponseMapper = {
            toOrderResponseList: jest.fn(),
        };
        orderController = new OrderController(createOrderUseCase, getOrdersUseCase);
        (orderController as any).orderRequestMapper = orderRequestMapper;
        (orderController as any).orderIdDtoMapper = orderIdDtoMapper;
        (orderController as any).queryOptionsDtoMapper = queryOptionsDtoMapper;
        (orderController as any).orderResponseMapper = orderResponseMapper;
    });

    describe('POST /orders (create order)', () => {
        describe('Success', () => {
            it('should save the order', async () => {
                const request: any = { user: { userId: VALID_ORDER.restaurant.ownerId } };
                const orderRequest: OrderRequest = VALID_ORDER_REQUEST;
                const mappedOrder: Order = VALID_ORDER;
                const savedOrderId: string = VALID_ORDER.id;
                const orderIdDto: OrderIdDto = VALID_ORDER_ID_DTO;

                jest.spyOn(orderRequestMapper, 'toOrder').mockReturnValue(mappedOrder);
                jest.spyOn(createOrderUseCase, 'saveOrder').mockResolvedValue(savedOrderId);
                jest.spyOn(orderIdDtoMapper, 'toOrderIdDto').mockReturnValue(orderIdDto);

                const result = await orderController.saveOrder(orderRequest, request);

                expect(result).toEqual(orderIdDto);
                expect(orderRequestMapper.toOrder).toHaveBeenCalledWith(orderRequest, request.user.userId);
                expect(createOrderUseCase.saveOrder).toHaveBeenCalledWith(mappedOrder);
                expect(orderIdDtoMapper.toOrderIdDto).toHaveBeenCalledWith(savedOrderId);
            });
        });
    });

    describe('GET /orders (get orders)', () => {
        describe('Success', () => {
            it('should get order and return a order response', async () => {
                const queryOptions: QueryOptionsDto = QUERY_OPTIONS;
                const request: any = { user: { bossId: VALID_RESTAURANT.ownerId } };
                const expectedOrderResponse: OrderResponse = VALID_ORDER_RESPONSE;

                jest.spyOn(queryOptionsDtoMapper, 'toQueryOptions').mockReturnValue({ ...queryOptions });
                jest.spyOn(getOrdersUseCase, 'getOrders').mockResolvedValue([VALID_ORDER]);
                jest.spyOn(orderResponseMapper, 'toOrderResponseList').mockReturnValue([expectedOrderResponse]);

                const result = await orderController.getOrders(queryOptions, request);

                expect(result).toEqual([expectedOrderResponse]);
                expect(queryOptionsDtoMapper.toQueryOptions).toHaveBeenCalledWith(queryOptions);
                expect(getOrdersUseCase.getOrders).toHaveBeenCalledWith(request.user.bossId, queryOptions.status, queryOptions.page, queryOptions.limit);
                expect(orderResponseMapper.toOrderResponseList).toHaveBeenCalledWith([VALID_ORDER]);
            });
        });
    });
});