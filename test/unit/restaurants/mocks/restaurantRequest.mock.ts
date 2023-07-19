import { RestaurantRequest } from '../../../../src/restaurants/infrastructure/controllers/dtos/restaurantRequest.dto';
import { VALID_RESTAURANT_NO_ID } from './restaurant.mock';

export const VALID_RESTAURANT_REQUEST: RestaurantRequest = {
    name: VALID_RESTAURANT_NO_ID.name,
    nit: VALID_RESTAURANT_NO_ID.nit,
    address: VALID_RESTAURANT_NO_ID.address,
    telephoneNumber: VALID_RESTAURANT_NO_ID.telephoneNumber,
    logoUrl: VALID_RESTAURANT_NO_ID.logoUrl,
    ownerId: VALID_RESTAURANT_NO_ID.ownerId
};