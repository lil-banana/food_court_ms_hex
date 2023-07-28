import { Inject, Injectable } from '@nestjs/common';
import { DISH_PERSISTENCE_PORT, DishPersistencePort } from '../../domain/repositories/dish.repository';
import { Dish } from '../../domain/models/dish.model';
import { IGetDishesUseCase } from '../../domain/interfaces/getDishes.interface';

@Injectable()
export class GetDishesUseCase implements IGetDishesUseCase {
    constructor(
        @Inject(DISH_PERSISTENCE_PORT) private readonly dishRepository: DishPersistencePort
    ) { }

    async getDishes(restaurantId: string, page: number, limit: number, category: string): Promise<Dish[]> {
        try {
            return this.dishRepository.getDishes(restaurantId, page, limit, category);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}