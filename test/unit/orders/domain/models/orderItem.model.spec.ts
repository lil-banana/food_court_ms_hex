import { OrderItem } from '../../../../../src/orders/domain/models/orderItem.model';
import { VALID_ORDER_ITEM } from '../../mocks/orderItem.mock';

describe('Order Item Model', () => {
    describe('Success', () => {
        it('should create a new order item with valid arguments', () => {
            const orderItem: OrderItem = new OrderItem(VALID_ORDER_ITEM.id, VALID_ORDER_ITEM.dish, VALID_ORDER_ITEM.quantity);
        });
    });
});