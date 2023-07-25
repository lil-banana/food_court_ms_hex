import { Dish } from '../models/dish.model';

export const MODIFY_DISH_USE_CASE = 'MODIFY_DISH_USE_CASE';

export interface IModifyDishUseCase {
    modifyDish(dishId: string, dishUpdate: Partial<Dish>): Promise<void>;
}