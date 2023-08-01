import { VALID_ORDER_REQUEST } from '../../../mocks/orderRequest.mock';
import { OrderRequestMapper } from '../../../../../../src/orders/infrastructure/controllers/mappers/orderRequest.mapper';
import { OrderRequest } from '../../../../../../src/orders/infrastructure/controllers/dtos/orderRequest.dto';
import { Order } from '../../../../../../src/orders/domain/models/order.model';
import { VALID_ORDER_NO_ID } from '../../../mocks/order.mock';

describe('Order Request Mapper', () => {
    let orderRequestMapper: OrderRequestMapper;

    beforeEach(() => {
        orderRequestMapper = new OrderRequestMapper();
    });

    describe('Success', () => {
        describe('toOrder', () => {
            it('should map OrderRequest to Order', () => {
                const orderRequest: OrderRequest = VALID_ORDER_REQUEST;
                const clientId: string = VALID_ORDER_NO_ID.clientId;
                const expectedOrder: Order = VALID_ORDER_NO_ID;
    
                const order = orderRequestMapper.toOrder(orderRequest, clientId);

                expect(order).toEqual(expectedOrder);
            });
        });
    });
});