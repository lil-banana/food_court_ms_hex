import { Restaurant } from '../../../domain/models/restaurant.model';
import { RestaurantRequest } from '../dtos/restaurantRequest.dto';

export class RestaurantRequestMapper {
    toRestaurant(restaurantRequest: RestaurantRequest): Restaurant {
        const restaurant: Restaurant = new Restaurant(
            undefined,
            restaurantRequest.name,
            restaurantRequest.nit,
            restaurantRequest.address,
            restaurantRequest.telephoneNumber,
            restaurantRequest.logoUrl,
            restaurantRequest.ownerId
        );
        return restaurant;
    }
}