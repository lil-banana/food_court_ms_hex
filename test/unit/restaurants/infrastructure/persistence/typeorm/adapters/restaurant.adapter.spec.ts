import { RestaurantAdapter } from '../../../../../../../src/restaurants/infrastructure/persistence/typeorm/adapters/restaurant.adapter';
import { Restaurant } from '../../../../../../../src/restaurants/domain/models/restaurant.model';
import { RestaurantEntity } from '../../../../../../../src/restaurants/infrastructure/persistence/typeorm/entities/restaurant.entity';
import { VALID_RESTAURANT, VALID_RESTAURANT_NO_ID } from '../../../../mocks/restaurant.mock';
import { VALID_RESTAURANT_ENTITY, VALID_RESTAURANT_ENTITY_NO_ID } from '../../../../mocks/restaurantEntity.mock';

describe('Restaurant Adapter', () => {
    let restaurantRepository: any;
    let restaurantEntityMapper: any;
    let restaurantAdapter: RestaurantAdapter;

    beforeEach(() => {
        restaurantRepository = {
            save: jest.fn()
        };
        restaurantEntityMapper = {
            toRestaurant: jest.fn(),
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
            it('should throw RestaurantAlreadyExistsException if restaurant already exists', async () => {
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
});
