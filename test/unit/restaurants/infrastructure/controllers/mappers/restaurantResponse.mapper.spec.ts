import { Restaurant } from '../../../../../../src/restaurants/domain/models/restaurant.model';
import { RestaurantResponse } from '../../../../../../src/restaurants/infrastructure/controllers/dtos/restaurantResponse.dto';
import { RestaurantResponseMapper } from '../../../../../../src/restaurants/infrastructure/controllers/mappers/restaurantResponse.mapper';
import { VALID_RESTAURANT_RESPONSE } from '../../../mocks/restaurantResponse.mock';
import { VALID_RESTAURANT } from '../../../mocks/restaurant.mock';

describe('Restaurant Response Mapper', () => {
    let restaurantResponseMapper: RestaurantResponseMapper;

    beforeEach(() => {
        restaurantResponseMapper = new RestaurantResponseMapper();
    });

    describe('Success', () => {
        describe('toRestaurantResponse', () => {
            it('should map Restaurant to RestaurantResponse', () => {
                const restaurant: Restaurant = VALID_RESTAURANT;
                const expectedRestaurantResponse: RestaurantResponse = VALID_RESTAURANT_RESPONSE;
    
                const restaurantResponse = restaurantResponseMapper.toRestaurantResponse(restaurant);
    
                expect(restaurantResponse).toEqual(expectedRestaurantResponse);
            });
        });

        describe('toRestaurantResponseList', () => {
            it('should map RestaurantList RestaurantResponseList', () => {
                const restaurantList: Restaurant[] = [ VALID_RESTAURANT ];
                const expectedRestaurantResponseList: RestaurantResponse[] = [ VALID_RESTAURANT_RESPONSE ];
    
                const restaurantResponse = restaurantResponseMapper.toRestaurantResponseList(restaurantList);
    
                expect(restaurantResponse).toEqual(expectedRestaurantResponseList);
            });
        });
    });
});