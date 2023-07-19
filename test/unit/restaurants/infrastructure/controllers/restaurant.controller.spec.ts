import { RestaurantController } from '../../../../../src/restaurants/infrastructure/controllers/restaurant.controller';
import { RestaurantRequest } from '../../../../../src/restaurants/infrastructure/controllers/dtos/restaurantRequest.dto';
import { RestaurantResponse } from '../../../../../src/restaurants/infrastructure/controllers/dtos/restaurantResponse.dto';
import { Restaurant } from '../../../../../src/restaurants/domain/models/restaurant.model';
import { VALID_RESTAURANT, VALID_RESTAURANT_NO_ID } from '../../mocks/restaurant.mock';
import { VALID_RESTAURANT_REQUEST } from '../../mocks/restaurantRequest.mock';
import { VALID_RESTAURANT_RESPONSE } from '../../mocks/restaurantResponse.mock';

describe('Restaurant Controller', () => {
    let restaurantController: RestaurantController;
    let createRestaurantUseCase: any;
    let restaurantRequestMapper: any;
    let restaurantResponseMapper: any;

    beforeEach(() => {
        createRestaurantUseCase = {
            saveRestaurant: jest.fn(),
        };
        restaurantRequestMapper = {
            toRestaurant: jest.fn(),
        };
        restaurantResponseMapper = {
            toRestaurantResponse: jest.fn(),
        };
        restaurantController = new RestaurantController(createRestaurantUseCase);
        (restaurantController as any).restaurantRequestMapper = restaurantRequestMapper;
        (restaurantController as any).restaurantResponseMapper = restaurantResponseMapper;
    });

    describe('POST /restaurants (create restaurant)', () => {
        describe('Success', () => {
            it('should save the restaurant and return a restaurant response', async () => {
                const restaurantRequest: RestaurantRequest = VALID_RESTAURANT_REQUEST;
                const mappedRestaurant: Restaurant = VALID_RESTAURANT_NO_ID;
                const savedRestaurant: Restaurant = VALID_RESTAURANT;
                const restaurantResponse: RestaurantResponse = VALID_RESTAURANT_RESPONSE;

                jest.spyOn(restaurantRequestMapper, 'toRestaurant').mockReturnValue(mappedRestaurant);
                jest.spyOn(createRestaurantUseCase, 'saveRestaurant').mockResolvedValue(savedRestaurant);
                jest.spyOn(restaurantResponseMapper, 'toRestaurantResponse').mockReturnValue(restaurantResponse);

                const result = await restaurantController.saveRestaurant(restaurantRequest);

                expect(restaurantRequestMapper.toRestaurant).toHaveBeenCalledWith(restaurantRequest);
                expect(createRestaurantUseCase.saveRestaurant).toHaveBeenCalledWith(mappedRestaurant);
                expect(restaurantResponseMapper.toRestaurantResponse).toHaveBeenCalledWith(savedRestaurant);
                expect(result).toEqual(restaurantResponse);
            });
        });
    });
});