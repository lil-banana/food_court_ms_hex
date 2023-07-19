import { RestaurantEntity } from '../../../../../../../src/restaurants/infrastructure/persistence/typeorm/entities/restaurant.entity';
import { VALID_RESTAURANT } from '../../../../../../unit/restaurants/mocks/restaurant.mock';
import { RestaurantRepository } from '../../../../../../../src/restaurants/infrastructure/persistence/typeorm/repositories/restaurant.repository';
import { VALID_RESTAURANT_ENTITY, VALID_RESTAURANT_ENTITY_NO_ID } from '../../../../mocks/restaurantEntity.mock';

describe('Restaurant Repository', () => {
    let restaurantRepository: RestaurantRepository;
    let entityRepository: any;

    beforeEach(() => {
        entityRepository = {
            save: jest.fn(),
            findOne: jest.fn()
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

        describe('findOneByOwner', () => {
            it('should find the restaurant with the given ownerId', async () => {
                const expectedRestaurantEntity: RestaurantEntity = VALID_RESTAURANT_ENTITY;

                jest.spyOn(entityRepository, 'findOne').mockResolvedValue(expectedRestaurantEntity);
    
                const result = await restaurantRepository.findOneByOwner(expectedRestaurantEntity.ownerId);
    
                expect(result).toBe(expectedRestaurantEntity);
                expect(entityRepository.findOne).toHaveBeenCalledWith({ where: { ownerId: expectedRestaurantEntity.ownerId } });
            });
        });
    });
});