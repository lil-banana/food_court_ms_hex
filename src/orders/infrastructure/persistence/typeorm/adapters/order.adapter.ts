import { Injectable } from '@nestjs/common';
import { OrderPersistencePort } from '../../../../domain/repositories/order.repository';
import { OrderEntityMapper } from '../mappers/orderEntity.mapper';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../../../../domain/models/order.model';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderAdapter implements OrderPersistencePort {
    private readonly orderEntityMapper: OrderEntityMapper = new OrderEntityMapper();

    constructor(
        private readonly orderRepository: OrderRepository
    ) { }

    async saveOrder(order: Order): Promise<string> {
        try {
            const orderEntity: OrderEntity = this.orderEntityMapper.toOrderEntity(order);
            return (await this.orderRepository.save(orderEntity)).id;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async checkActiveOrderByClient(clientId: string): Promise<boolean> {
        try {
            return (await this.orderRepository.getActiveOrderByClient(clientId)).length > 0;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getOrders(ownerId: string, status: string, page: number, limit: number): Promise<Order[]> {
        try {
            const skip = (page - 1) * limit;
            return this.orderEntityMapper.toOrderList(await this.orderRepository.findAll(ownerId, status, skip, limit));
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}