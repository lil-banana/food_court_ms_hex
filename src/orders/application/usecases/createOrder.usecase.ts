import { Inject, Injectable } from '@nestjs/common';
import { ORDER_PERSISTENCE_PORT, OrderPersistencePort } from '../../domain/repositories/order.repository';
import { ICreateOrderUseCase } from '../../domain/interfaces/createOrder.interface';
import { Order } from '../../domain/models/order.model';
import { DISH_PERSISTENCE_PORT, DishPersistencePort } from '../../../dishes/domain/repositories/dish.repository';
import { DishAndRestaurantDoNotMatchException } from '../exceptions/dishAndRestaurantDoNotMatch.exception';
import { AlreadyHasActiveOrderException } from '../exceptions/alreadyHasActiveOrder.exception';
import { DishIsNotActiveException } from '../exceptions/dishIsNotActive.exception';

@Injectable()
export class CreateOrderUseCase implements ICreateOrderUseCase {
    constructor(
        @Inject(ORDER_PERSISTENCE_PORT) private readonly orderRepository: OrderPersistencePort,
        @Inject(DISH_PERSISTENCE_PORT) private readonly dishRepository: DishPersistencePort
    ) { }

    async saveOrder(order: Order): Promise<string> {
        try {
            if (await this.orderRepository.checkActiveOrderByClient(order.clientId)) {
                throw new AlreadyHasActiveOrderException('The client already has an active order');
            }
            for (const item of order.items) {
                const dish = await this.dishRepository.getDish(item.dish.id);
                if (dish.restaurant.id !== order.restaurant.id) {
                    throw new DishAndRestaurantDoNotMatchException('Dish does not belong to the restaurant provided');
                }
                if (!dish.active) {
                    throw new DishIsNotActiveException('Dish provided is deactivated')
                }
            }
            return await this.orderRepository.saveOrder(order);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}