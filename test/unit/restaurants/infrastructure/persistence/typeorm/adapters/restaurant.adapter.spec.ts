import { RestaurantAdapter } from '../../../../../../../src/restaurants/infrastructure/persistence/typeorm/adapters/restaurant.adapter';
import { Restaurant } from '../../../../../../../src/restaurants/domain/models/restaurant.model';
import { RestaurantEntity } from '../../../../../../../src/restaurants/infrastructure/persistence/typeorm/entities/restaurant.entity';
import { VALID_RESTAURANT, VALID_RESTAURANT_NO_ID } from '../../../../mocks/restaurant.mock';
import { VALID_RESTAURANT_ENTITY, VALID_RESTAURANT_ENTITY_NO_ID } from '../../../../mocks/restaurantEntity.mock';
import { PAGINATION } from '../../../../mocks/paginationDto.mock';

describe('Restaurant Adapter', () => {
    let restaurantAdapter: RestaurantAdapter;
    let restaurantRepository: any;
    let restaurantEntityMapper: any;

    beforeEach(() => {
        restaurantRepository = {
            save: jest.fn(),
            findOneByOwner: jest.fn(),
            findAll: jest.fn()
        };
        restaurantEntityMapper = {
            toRestaurant: jest.fn(),
            toRestaurantList: jest.fn(),
            toRestaurantEntity: jest.fn()
        };
        restaurantAdapter = new RestaurantAdapter(restaurantRepository);
        (restaurantAdapter as any).restaurantEntityMapper = restaurantEntityMapper;
    });

    describe('saveRestaurant', () => {
        describe('Success', () => {
            it('should save a new restaurant', async () => {
                const restaurant: Restaurant = VALID_RESTAURANT_NO_ID;
                const restaurantEntity: RestaurantEntity = VALID_RESTAURANT_ENTITY_NO_ID;
                const expectedRestaurantEntity: RestaurantEntity = VALID_RESTAURANT_ENTITY;
                const expectedRestaurant: Restaurant = VALID_RESTAURANT;

                jest.spyOn(restaurantEntityMapper, 'toRestaurantEntity').mockReturnValue(restaurantEntity);
                jest.spyOn(restaurantRepository, 'save').mockResolvedValue(expectedRestaurantEntity);
                jest.spyOn(restaurantEntityMapper, 'toRestaurant').mockReturnValue(expectedRestaurant);

                const result = await restaurantAdapter.saveRestaurant(restaurant);

                expect(result).toEqual(expectedRestaurant);
                expect(restaurantEntityMapper.toRestaurantEntity).toHaveBeenCalledWith(restaurant);
                expect(restaurantRepository.save).toHaveBeenCalledWith(restaurantEntity);
                expect(restaurantEntityMapper.toRestaurant).toHaveBeenCalledWith(expectedRestaurantEntity);
            });
        });

        describe('Failure', () => {
            it('should throw an unexpected error', async () => {
                const restaurant: Restaurant = VALID_RESTAURANT_NO_ID;
                const restaurantEntity: RestaurantEntity = VALID_RESTAURANT_ENTITY_NO_ID;

                jest.spyOn(console, 'error').mockImplementation(() => { });
                jest.spyOn(restaurantEntityMapper, 'toRestaurantEntity').mockReturnValue(restaurantEntity);
                jest.spyOn(restaurantRepository, 'save').mockRejectedValue(new Error());

                await expect(restaurantAdapter.saveRestaurant(restaurant)).rejects.toThrow(Error);
                expect(restaurantEntityMapper.toRestaurantEntity).toHaveBeenCalledWith(restaurant);
            });
        });
    });
    
    describe('getRestaurantByOwner', () => {
        describe('Success', () => {
            it('should get a restaurant by its owner', async () => {
                const expectedRestaurantEntity: RestaurantEntity = VALID_RESTAURANT_ENTITY;
                const expectedRestaurant: Restaurant = VALID_RESTAURANT;

                jest.spyOn(restaurantRepository, 'findOneByOwner').mockResolvedValue(expectedRestaurantEntity);
                jest.spyOn(restaurantEntityMapper, 'toRestaurant').mockReturnValue(expectedRestaurant);

                const result = await restaurantAdapter.getRestaurantByOwner(expectedRestaurantEntity.ownerId);

                expect(result).toEqual(expectedRestaurant);
                expect(restaurantRepository.findOneByOwner).toHaveBeenCalledWith(expectedRestaurantEntity.ownerId);
                expect(restaurantEntityMapper.toRestaurant).toHaveBeenCalledWith(expectedRestaurantEntity);
            });
        });

        describe('Failure', () => {
            it('should throw an unexpected error', async () => {
                jest.spyOn(console, 'error').mockImplementation(() => { });
                jest.spyOn(restaurantRepository, 'findOneByOwner').mockRejectedValue(new Error());

                await expect(restaurantAdapter.getRestaurantByOwner('id')).rejects.toThrow(Error);
            });
        });
    });
    
    describe('getRestaurants', () => {
        describe('Success', () => {
            it('should get restaurants', async () => {
                const { page, limit } = PAGINATION;
                const expectedRestaurantEntityList: RestaurantEntity[] = [ VALID_RESTAURANT_ENTITY ];
                const expectedRestaurantList: Restaurant[] = [ VALID_RESTAURANT ];

                jest.spyOn(restaurantRepository, 'findAll').mockResolvedValue(expectedRestaurantEntityList);
                jest.spyOn(restaurantEntityMapper, 'toRestaurantList').mockReturnValue(expectedRestaurantList);

                const result = await restaurantAdapter.getRestaurants(page, limit);

                expect(result).toEqual(expectedRestaurantList);
                expect(restaurantRepository.findAll).toHaveBeenCalledWith((page - 1) * limit, limit);
                expect(restaurantEntityMapper.toRestaurantList).toHaveBeenCalledWith(expectedRestaurantEntityList);
            });
        });

        describe('Failure', () => {
            it('should throw an unexpected error', async () => {
                const { page, limit } = PAGINATION;
                jest.spyOn(console, 'error').mockImplementation(() => { });
                jest.spyOn(restaurantRepository, 'findAll').mockRejectedValue(new Error());

                await expect(restaurantAdapter.getRestaurants(page, limit)).rejects.toThrow(Error);
            });
        });
    });
});
