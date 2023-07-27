import { RestaurantResponse } from '../../../../src/restaurants/infrastructure/controllers/dtos/restaurantResponse.dto';
import { VALID_RESTAURANT } from './restaurant.mock';

export const VALID_RESTAURANT_RESPONSE: RestaurantResponse = {
    id: VALID_RESTAURANT.id,
    name: VALID_RESTAURANT.name,
    logoUrl: VALID_RESTAURANT.logoUrl
};