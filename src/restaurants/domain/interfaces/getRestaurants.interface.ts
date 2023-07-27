import { Restaurant } from '../models/restaurant.model';

export const GET_RESTAURANTS_USE_CASE = 'GET_RESTAURANTS_USE_CASE';

export interface IGetRestaurantsUseCase {
    getRestaurants(page: number, limit: number): Promise<Restaurant[]>;
}