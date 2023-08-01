import { Order } from '../../../../../src/orders/domain/models/order.model';
import { VALID_ORDER } from '../../mocks/order.mock';

describe('Order Model', () => {
    describe('Success', () => {
        it('should create a new order with valid arguments', () => {
            const order: Order = new Order(VALID_ORDER.id, VALID_ORDER.clientId, VALID_ORDER.restaurant, VALID_ORDER.items, VALID_ORDER.status);
            expect(order.id).toBe(VALID_ORDER.id);
            expect(order.clientId).toBe(VALID_ORDER.clientId);
            expect(order.restaurant).toBe(VALID_ORDER.restaurant);
            expect(order.items).toBe(VALID_ORDER.items);
            expect(order.status).toBe(VALID_ORDER.status);
        });

        it('should update order status', () => {
            const order: Order = VALID_ORDER;
            order.status = 'cancelled';

            expect(order.status).toBe('cancelled');
        });
    });
});