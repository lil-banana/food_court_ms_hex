import { RestaurantResponse } from '../../../../src/restaurants/infrastructure/controllers/dtos/restaurantResponse.dto';
import { VALID_RESTAURANT } from './restaurant.mock';

export const VALID_RESTAURANT_RESPONSE: RestaurantResponse = {
    id: VALID_RESTAURANT.id,
    name: VALID_RESTAURANT.name,
    nit: VALID_RESTAURANT.nit,
    address: VALID_RESTAURANT.address,
    telephoneNumber: VALID_RESTAURANT.telephoneNumber,
    logoUrl: VALID_RESTAURANT.logoUrl,
    ownerId: VALID_RESTAURANT.ownerId
};