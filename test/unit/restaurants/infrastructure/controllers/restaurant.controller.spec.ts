import { RestaurantController } from '../../../../../src/restaurants/infrastructure/controllers/restaurant.controller';
import { RestaurantRequest } from '../../../../../src/restaurants/infrastructure/controllers/dtos/restaurantRequest.dto';
import { RestaurantIdDto } from '../../../../../src/restaurants/infrastructure/controllers/dtos/restaurantId.dto';
import { Restaurant } from '../../../../../src/restaurants/domain/models/restaurant.model';
import { VALID_RESTAURANT, VALID_RESTAURANT_NO_ID } from '../../mocks/restaurant.mock';
import { VALID_RESTAURANT_REQUEST } from '../../mocks/restaurantRequest.mock';
import { VALID_RESTAURANT_ID_DTO } from '../../mocks/restaurantIdDto.mock';

describe('Restaurant Controller', () => {
    let restaurantController: RestaurantController;
    let createRestaurantUseCase: any;
    let restaurantRequestMapper: any;
    let restaurantIdDtoMapper: any;

    beforeEach(() => {
        createRestaurantUseCase = {
            saveRestaurant: jest.fn(),
        };
        restaurantRequestMapper = {
            toRestaurant: jest.fn(),
        };
        restaurantIdDtoMapper = {
            toRestaurantIdDto: jest.fn(),
        };
        restaurantController = new RestaurantController(createRestaurantUseCase);
        (restaurantController as any).restaurantRequestMapper = restaurantRequestMapper;
        (restaurantController as any).restaurantIdDtoMapper = restaurantIdDtoMapper;
    });

    describe('POST /restaurants (create restaurant)', () => {
        describe('Success', () => {
            it('should save the restaurant and return a restaurant response', async () => {
                const restaurantRequest: RestaurantRequest = VALID_RESTAURANT_REQUEST;
                const mappedRestaurant: Restaurant = VALID_RESTAURANT_NO_ID;
                const savedRestaurant: Restaurant = VALID_RESTAURANT;
                const expectedRestaurantIdDto: RestaurantIdDto = VALID_RESTAURANT_ID_DTO;
    
                jest.spyOn(restaurantRequestMapper, 'toRestaurant').mockReturnValue(mappedRestaurant);
                jest.spyOn(createRestaurantUseCase, 'saveRestaurant').mockResolvedValue(savedRestaurant);
                jest.spyOn(restaurantIdDtoMapper, 'toRestaurantIdDto').mockReturnValue(expectedRestaurantIdDto);

                const result = await restaurantController.saveRestaurant(restaurantRequest);

                expect(result).toEqual(expectedRestaurantIdDto);
                expect(restaurantRequestMapper.toRestaurant).toHaveBeenCalledWith(restaurantRequest);
                expect(createRestaurantUseCase.saveRestaurant).toHaveBeenCalledWith(mappedRestaurant);
                expect(restaurantIdDtoMapper.toRestaurantIdDto).toHaveBeenCalledWith(savedRestaurant);
            });
        });
    });
});