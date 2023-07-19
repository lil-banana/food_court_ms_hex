import { Restaurant } from '../models/restaurant.model';

export const RESTAURANT_PERSISTENCE_PORT = 'RESTAURANT_PERSISTENCE_PORT';

export interface RestaurantPersistencePort {
    saveRestaurant(restaurant: Restaurant): Promise<Restaurant>;
    getRestaurantByOwner(ownerId: string): Promise<Restaurant>;
}