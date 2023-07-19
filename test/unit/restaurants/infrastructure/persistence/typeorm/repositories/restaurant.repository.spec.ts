import { RestaurantEntity } from '../../../../../../../src/restaurants/infrastructure/persistence/typeorm/entities/restaurant.entity';
import { RestaurantRepository } from '../../../../../../../src/restaurants/infrastructure/persistence/typeorm/repositories/restaurant.repository';
import { VALID_RESTAURANT_ENTITY, VALID_RESTAURANT_ENTITY_NO_ID } from '../../../../mocks/restaurantEntity.mock';

describe('Restaurant Repository', () => {
    let restaurantRepository: RestaurantRepository;
    let entityRepository: any;

    beforeEach(() => {
        entityRepository = {
            save: jest.fn()
        };
        restaurantRepository = new RestaurantRepository(entityRepository);
    });

    describe('Success', () => {
        describe('save', () => {
            it('should save the restaurant', async () => {
                const restaurantEntity: RestaurantEntity = VALID_RESTAURANT_ENTITY_NO_ID;
                const expectedRestaurantEntity: RestaurantEntity = VALID_RESTAURANT_ENTITY;

                jest.spyOn(entityRepository, 'save').mockResolvedValue(expectedRestaurantEntity);
    
                const result = await restaurantRepository.save(restaurantEntity);
    
                expect(result).toBe(expectedRestaurantEntity);
                expect(entityRepository.save).toHaveBeenCalledWith(restaurantEntity);
            });
        });
    });
});