import { Restaurant } from '../../../../../../src/restaurants/domain/models/restaurant.model';
import { RestaurantRequest } from '../../../../../../src/restaurants/infrastructure/controllers/dtos/restaurantRequest.dto';
import { RestaurantRequestMapper } from '../../../../../../src/restaurants/infrastructure/controllers/mappers/restaurantRequest.mapper';
import { VALID_RESTAURANT_REQUEST } from '../../../mocks/restaurantRequest.mock';
import { VALID_RESTAURANT_NO_ID } from '../../../mocks/restaurant.mock';

describe('Restaurant Request Mapper', () => {
    let restaurantRequestMapper: RestaurantRequestMapper;

    beforeEach(() => {
        restaurantRequestMapper = new RestaurantRequestMapper();
    });

    describe('Success', () => {
        describe('toRestaurant', () => {
            it('should map RestaurantRequest to Restaurant', () => {
                const restaurantRequest: RestaurantRequest = VALID_RESTAURANT_REQUEST;
                const expectedRestaurant: Restaurant = VALID_RESTAURANT_NO_ID;
    
                const restaurant = restaurantRequestMapper.toRestaurant(restaurantRequest);
    
                expect(restaurant).toEqual(expectedRestaurant);
            });
        });
    });
});