import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(OrderEntity)
        private orderRepository: Repository<OrderEntity>,
    ) { }

    save(order: OrderEntity): Promise<OrderEntity> {
        return this.orderRepository.save(order);
    }

    getActiveOrderByClient(clientId: string): Promise<OrderEntity[]> {
        return this.orderRepository.find({
            where: {
                clientId,
                status: Not(In([ 'cancelled', 'delivered' ]))
            }
        });
    }

    findAll(ownerId: string, status: string, skip: number, take: number): Promise<OrderEntity[]> {
        const options: any = {
            skip,
            take,
            where: {
                restaurant: { ownerId },
                status
            }
        };
        return this.orderRepository.find(options);
    }
}