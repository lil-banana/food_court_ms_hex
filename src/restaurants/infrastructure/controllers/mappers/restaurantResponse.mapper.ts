import { Restaurant } from '../../../domain/models/restaurant.model';
import { RestaurantResponse } from '../dtos/restaurantResponse.dto';

export class RestaurantResponseMapper {
    toRestaurantResponse(restaurant: Restaurant): RestaurantResponse {
        const restaurantResponse: RestaurantResponse = new RestaurantResponse();
        restaurantResponse.id = restaurant.id;
        restaurantResponse.name = restaurant.name;
        restaurantResponse.nit = restaurant.nit;
        restaurantResponse.address = restaurant.address;
        restaurantResponse.telephoneNumber = restaurant.telephoneNumber;
        restaurantResponse.logoUrl = restaurant.logoUrl;
        restaurantResponse.ownerId = restaurant.ownerId;
        return restaurantResponse;
    }
}