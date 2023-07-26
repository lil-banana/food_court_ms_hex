import { Restaurant } from '../../../domain/models/restaurant.model';
import { RestaurantIdDto } from '../dtos/restaurantId.dto';

export class RestaurantIdDtoMapper {
    toRestaurantIdDto(restaurant: Restaurant): RestaurantIdDto {
        const restaurantIdDto: RestaurantIdDto = new RestaurantIdDto();
        restaurantIdDto.id = restaurant.id;
        return restaurantIdDto;
    }
}