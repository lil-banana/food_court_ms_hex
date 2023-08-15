import { Order } from '../models/order.model';

export const GET_ORDERS_USE_CASE = 'GET_ORDERS_USE_CASE';

export interface IGetOrdersUseCase {
    getOrders(ownerId: string, status: string, page: number, limit: number): Promise<Order[]>;
}