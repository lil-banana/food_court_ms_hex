import { Restaurant } from '../../../../domain/models/restaurant.model';
import { RestaurantEntity } from '../entities/restaurant.entity';

export class RestaurantEntityMapper {
    toRestaurant(restaurantEntity: RestaurantEntity): Restaurant {
        const restaurant: Restaurant = new Restaurant(
            restaurantEntity.id,
            restaurantEntity.name,
            restaurantEntity.nit,
            restaurantEntity.address,
            restaurantEntity.telephoneNumber,
            restaurantEntity.logoUrl,
            restaurantEntity.ownerId
        );
        return restaurant;
    }

    toRestaurantList(restaurantEntityList: RestaurantEntity[]): Restaurant[] {
        return restaurantEntityList.map(restaurantEntity => this.toRestaurant(restaurantEntity));
    }

    toRestaurantEntity(restaurant: Restaurant): RestaurantEntity {
        const restaurantEntity: RestaurantEntity = new RestaurantEntity();
        restaurantEntity.id = restaurant.id;
        restaurantEntity.name = restaurant.name;
        restaurantEntity.nit = restaurant.nit;
        restaurantEntity.address = restaurant.address;
        restaurantEntity.telephoneNumber = restaurant.telephoneNumber;
        restaurantEntity.logoUrl = restaurant.logoUrl;
        restaurantEntity.ownerId = restaurant.ownerId;
        return restaurantEntity;
    }
}