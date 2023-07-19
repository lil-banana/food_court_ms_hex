import { Dish } from '../models/dish.model';

export const DISH_PERSISTENCE_PORT = 'DISH_PERSISTENCE_PORT';

export interface DishPersistencePort {
    saveDish(dish: Dish): Promise<Dish>;
}