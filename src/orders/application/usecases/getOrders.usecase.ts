import { Inject, Injectable } from '@nestjs/common';
import { ORDER_PERSISTENCE_PORT, OrderPersistencePort } from '../../domain/repositories/order.repository';
import { Order } from '../../domain/models/order.model';
import { IGetOrdersUseCase } from '../../domain/interfaces/getOrders.interface';

@Injectable()
export class GetOrdersUseCase implements IGetOrdersUseCase {
    constructor(
        @Inject(ORDER_PERSISTENCE_PORT) private readonly orderRepository: OrderPersistencePort
    ) { }

    async getOrders(ownerId: string, status: string, page: number, limit: number): Promise<Order[]> {
        try {
            return this.orderRepository.getOrders(ownerId, status, page, limit);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}