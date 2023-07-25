import { DishEntity } from '../../../../../../../src/dishes/infrastructure/persistence/typeorm/entities/dish.entity';
import { DishRepository } from '../../../../../../../src/dishes/infrastructure/persistence/typeorm/repositories/dish.repository';
import { VALID_DISH_ENTITY, VALID_DISH_ENTITY_NO_ID } from '../../../../mocks/dishEntity.mock';

describe('Dish Repository', () => {
    let dishRepository: DishRepository;
    let entityRepository: any;

    beforeEach(() => {
        entityRepository = {
            save: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn()
        };
        dishRepository = new DishRepository(entityRepository);
    });

    describe('Success', () => {
        describe('save', () => {
            it('should save the dish', async () => {
                const dishEntity: DishEntity = VALID_DISH_ENTITY_NO_ID;
                const expectedDishEntity: DishEntity = VALID_DISH_ENTITY;

                jest.spyOn(entityRepository, 'save').mockResolvedValue(expectedDishEntity);
    
                const result = await dishRepository.save(dishEntity);
    
                expect(result).toBe(expectedDishEntity);
                expect(entityRepository.save).toHaveBeenCalledWith(dishEntity);
            });
        });

        describe('findOneById', () => {
            it('should find a dish with the given id', async () => {
                const expectedDishEntity: DishEntity = VALID_DISH_ENTITY;

                jest.spyOn(entityRepository, 'findOneBy').mockResolvedValue(expectedDishEntity);
    
                const result = await dishRepository.findOneById(expectedDishEntity.id);
    
                expect(result).toBe(expectedDishEntity);
                expect(entityRepository.findOneBy).toHaveBeenCalledWith({ id: expectedDishEntity.id });
            });
        });
    });
});