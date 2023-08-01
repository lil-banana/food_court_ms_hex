import { Order } from '../models/order.model';

export const ORDER_PERSISTENCE_PORT = 'ORDER_PERSISTENCE_PORT';

export interface OrderPersistencePort {
    saveOrder(order: Order): Promise<string>;
    checkActiveOrderByClient(clientId: string): Promise<boolean>;
}