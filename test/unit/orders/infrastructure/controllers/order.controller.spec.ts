import { OrderController } from '../../../../../src/orders/infrastructure/controllers/order.controller';
import { OrderRequest } from '../../../../../src/orders/infrastructure/controllers/dtos/orderRequest.dto';
import { OrderIdDto } from '../../../../../src/orders/infrastructure/controllers/dtos/orderIdDto.dto';
import { Order } from '../../../../../src/orders/domain/models/order.model';
import { VALID_ORDER } from '../../mocks/order.mock';
import { VALID_ORDER_REQUEST } from '../../mocks/orderRequest.mock';
import { VALID_ORDER_ID_DTO } from '../../mocks/orderIdDto.mock';

describe('Order Controller', () => {
    let orderController: OrderController;
    let createOrderUseCase: any;
    let orderRequestMapper: any;
    let orderIdDtoMapper: any;

    beforeEach(() => {
        createOrderUseCase = {
            saveOrder: jest.fn(),
        };
        orderRequestMapper = {
            toOrder: jest.fn(),
        };
        orderIdDtoMapper = {
            toOrderIdDto: jest.fn(),
        };
        orderController = new OrderController(createOrderUseCase);
        (orderController as any).orderRequestMapper = orderRequestMapper;
        (orderController as any).orderIdDtoMapper = orderIdDtoMapper;
    });

    describe('POST /orders (create order)', () => {
        describe('Success', () => {
            it('should save the order and return a order response', async () => {
                const request: any = { user: { userId : VALID_ORDER.restaurant.ownerId } }; 
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
});