import { Restaurant } from '../models/restaurant.model';

export const CREATE_RESTAURANT_USE_CASE = 'CREATE_RESTAURANT_USE_CASE';

export interface ICreateRestaurantUseCase {
    saveRestaurant(restaurant: Restaurant): Promise<Restaurant>;
}