import { Dish } from '../models/dish.model';

export const CREATE_DISH_USE_CASE = 'CREATE_DISH_USE_CASE';

export interface ICreateDishUseCase {
    saveDish(dish: Dish, restaurantId: string): Promise<Dish>;
}