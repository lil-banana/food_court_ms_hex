import { Restaurant } from '../../../../../../src/restaurants/domain/models/restaurant.model';
import { RestaurantIdDto } from '../../../../../../src/restaurants/infrastructure/controllers/dtos/restaurantId.dto';
import { RestaurantIdDtoMapper } from '../../../../../../src/restaurants/infrastructure/controllers/mappers/restaurantId.mapper';
import { VALID_RESTAURANT_ID_DTO } from '../../../mocks/restaurantIdDto.mock';
import { VALID_RESTAURANT } from '../../../mocks/restaurant.mock';

describe('Restaurant Id Dto Mapper', () => {
    let restaurantIdDtoMapper: RestaurantIdDtoMapper;

    beforeEach(() => {
        restaurantIdDtoMapper = new RestaurantIdDtoMapper();
    });

    describe('Success', () => {
        describe('toRestaurantIdDto', () => {
            it('should map Restaurant to RestaurantIdDto', () => {
                const restaurant: Restaurant = VALID_RESTAURANT;
                const expectedRestaurantIdDto: RestaurantIdDto = VALID_RESTAURANT_ID_DTO;
    
                const restaurantIdDto = restaurantIdDtoMapper.toRestaurantIdDto(restaurant);
    
                expect(restaurantIdDto).toEqual(expectedRestaurantIdDto);
            });
        });
    });
});