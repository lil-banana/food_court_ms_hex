import { RestaurantController } from '../../../../../src/restaurants/infrastructure/controllers/restaurant.controller';
import { RestaurantRequest } from '../../../../../src/restaurants/infrastructure/controllers/dtos/restaurantRequest.dto';
import { RestaurantIdDto } from '../../../../../src/restaurants/infrastructure/controllers/dtos/restaurantId.dto';
import { Restaurant } from '../../../../../src/restaurants/domain/models/restaurant.model';
import { VALID_RESTAURANT, VALID_RESTAURANT_NO_ID } from '../../mocks/restaurant.mock';
import { VALID_RESTAURANT_REQUEST } from '../../mocks/restaurantRequest.mock';
import { VALID_RESTAURANT_ID_DTO } from '../../mocks/restaurantIdDto.mock';
import { RestaurantResponse } from '../../../../../src/restaurants/infrastructure/controllers/dtos/restaurantResponse.dto';
import { VALID_RESTAURANT_RESPONSE } from '../../mocks/restaurantResponse.mock';
import { PaginationDto } from '../../../../../src/restaurants/infrastructure/controllers/dtos/pagination.dto';
import { PAGINATION } from '../../mocks/paginationDto.mock';

describe('Restaurant Controller', () => {
    let restaurantController: RestaurantController;
    let createRestaurantUseCase: any;
    let getRestaurantsUseCase: any;
    let restaurantRequestMapper: any;
    let restaurantIdDtoMapper: any;
    let paginationDtoMapper: any;
    let restaurantResponseMapper: any;

    beforeEach(() => {
        createRestaurantUseCase = {
            saveRestaurant: jest.fn(),
        };
        getRestaurantsUseCase = {
            getRestaurants: jest.fn(),
        };
        restaurantRequestMapper = {
            toRestaurant: jest.fn(),
        };
        restaurantIdDtoMapper = {
            toRestaurantIdDto: jest.fn(),
        };
        paginationDtoMapper = {
            toPagination: jest.fn(),
        };
        restaurantResponseMapper = {
            toRestaurantResponseList: jest.fn(),
        };
        restaurantController = new RestaurantController(createRestaurantUseCase, getRestaurantsUseCase);
        (restaurantController as any).restaurantRequestMapper = restaurantRequestMapper;
        (restaurantController as any).restaurantIdDtoMapper = restaurantIdDtoMapper;
        (restaurantController as any).paginationDtoMapper = paginationDtoMapper;
        (restaurantController as any).restaurantResponseMapper = restaurantResponseMapper;
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

    describe('GET /restaurants (get all restaurants)', () => {
        describe('Success', () => {
            it('should get all restaurants', async () => {
                const pagination: PaginationDto = PAGINATION;
                const expectedRestaurantResponse: RestaurantResponse = VALID_RESTAURANT_RESPONSE;
    
                jest.spyOn(paginationDtoMapper, 'toPagination').mockReturnValue({...pagination});
                jest.spyOn(getRestaurantsUseCase, 'getRestaurants').mockResolvedValue([ VALID_RESTAURANT ]);
                jest.spyOn(restaurantResponseMapper, 'toRestaurantResponseList').mockReturnValue([ expectedRestaurantResponse ]);

                const result = await restaurantController.getRestaurants(pagination);

                expect(result).toEqual([ expectedRestaurantResponse ]);
                expect(paginationDtoMapper.toPagination).toHaveBeenCalledWith(pagination);
                expect(getRestaurantsUseCase.getRestaurants).toHaveBeenCalledWith(pagination.page, pagination.limit);
                expect(restaurantResponseMapper.toRestaurantResponseList).toHaveBeenCalledWith([ VALID_RESTAURANT ]);
            });
        });
    });
});