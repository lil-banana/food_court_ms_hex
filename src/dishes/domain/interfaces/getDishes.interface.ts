import { Dish } from '../models/dish.model';

export const GET_DISHES_USE_CASE = 'GET_DISHES_USE_CASE';

export interface IGetDishesUseCase {
    getDishes(restaurantId: string, page: number, limit: number, category: string): Promise<Dish[]>;
}