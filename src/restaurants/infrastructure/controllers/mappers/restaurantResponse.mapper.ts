import { Restaurant } from '../../../domain/models/restaurant.model';
import { RestaurantResponse } from '../dtos/restaurantResponse.dto';

export class RestaurantResponseMapper {
    toRestaurantResponse(restaurant: Restaurant): RestaurantResponse {
        const restaurantResponse: RestaurantResponse = new RestaurantResponse();
        restaurantResponse.id = restaurant.id;
        restaurantResponse.name = restaurant.name;
        restaurantResponse.logoUrl = restaurant.logoUrl;
        return restaurantResponse;
    }

    toRestaurantResponseList(restaurantList: Restaurant[]): RestaurantResponse[] {
        return restaurantList.map(restaurant => this.toRestaurantResponse(restaurant));
    }
}