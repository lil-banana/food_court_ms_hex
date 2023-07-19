import { Inject, Injectable } from '@nestjs/common';
import { DISH_PERSISTENCE_PORT, DishPersistencePort } from '../../domain/repositories/dish.repository';
import { ICreateDishUseCase } from '../../domain/interfaces/createDish.interface';
import { Dish } from '../../domain/models/dish.model';
import { RESTAURANT_PERSISTENCE_PORT, RestaurantPersistencePort } from '../../../restaurants/domain/repositories/restaurant.repository';

@Injectable()
export class CreateDishUseCase implements ICreateDishUseCase {
    constructor(
        @Inject(DISH_PERSISTENCE_PORT) private readonly dishRepository: DishPersistencePort,
        @Inject(RESTAURANT_PERSISTENCE_PORT) private readonly restaurantRepository: RestaurantPersistencePort
    ) { }

    async saveDish(dish: Dish, ownerId: string): Promise<Dish> {
        try {
            dish.restaurant = await this.restaurantRepository.getRestaurantByOwner(ownerId);
            return await this.dishRepository.saveDish(dish);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}