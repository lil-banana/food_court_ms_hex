import { Order } from '../models/order.model';

export const CREATE_ORDER_USE_CASE = 'CREATE_ORDER_USE_CASE';

export interface ICreateOrderUseCase {
    saveOrder(order: Order): Promise<string>;
}