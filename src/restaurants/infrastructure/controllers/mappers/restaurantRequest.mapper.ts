import { Restaurant } from '../../../domain/models/restaurant.model';
import { RestaurantRequest } from '../dtos/restaurantRequest.dto';

export class RestaurantRequestMapper {
    toRestaurant(restaurantRequest: RestaurantRequest): Restaurant {
        const restaurant: Restaurant = new Restaurant(
            undefined,
            restaurantRequest.address,
            restaurantRequest.logoUrl,
            restaurantRequest.ownerId,
            restaurantRequest.name,
            restaurantRequest.nit,
            restaurantRequest.telephoneNumber,
        );
        return restaurant;
    }
}