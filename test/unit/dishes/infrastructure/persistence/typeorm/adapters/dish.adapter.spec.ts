import { DishAdapter } from '../../../../../../../src/dishes/infrastructure/persistence/typeorm/adapters/dish.adapter';
import { Dish } from '../../../../../../../src/dishes/domain/models/dish.model';
import { DishEntity } from '../../../../../../../src/dishes/infrastructure/persistence/typeorm/entities/dish.entity';
import { DishNotFoundException } from '../../../../../../../src/dishes/infrastructure/exceptions/dishNotFound.exception';
import { VALID_DISH, VALID_DISH_NO_ID } from '../../../../mocks/dish.mock';
import { VALID_DISH_ENTITY, VALID_DISH_ENTITY_NO_ID } from '../../../../mocks/dishEntity.mock';

describe('Dish Adapter', () => {
    let dishRepository: any;
    let dishEntityMapper: any;
    let dishAdapter: DishAdapter;

    beforeEach(() => {
        dishRepository = {
            save: jest.fn(),
            findOneById: jest.fn(),
            update: jest.fn()
        };
        dishEntityMapper = {
            toDish: jest.fn(),
            toDishEntity: jest.fn()
        };
        dishAdapter = new DishAdapter(dishRepository);
        (dishAdapter as any).dishEntityMapper = dishEntityMapper;
    });

    describe('saveDish', () => {
        describe('Success', () => {
            it('should save a new dish', async () => {
                const dish: Dish = VALID_DISH_NO_ID;
                const dishEntity: DishEntity = VALID_DISH_ENTITY_NO_ID;
                const expectedDishEntity: DishEntity = VALID_DISH_ENTITY;
                const expectedDish: Dish = VALID_DISH;

                jest.spyOn(dishEntityMapper, 'toDishEntity').mockReturnValue(dishEntity);
                jest.spyOn(dishRepository, 'save').mockResolvedValue(expectedDishEntity);
                jest.spyOn(dishEntityMapper, 'toDish').mockReturnValue(expectedDish);

                const result = await dishAdapter.saveDish(dish);

                expect(result).toEqual(expectedDish);
                expect(dishEntityMapper.toDishEntity).toHaveBeenCalledWith(dish);
                expect(dishRepository.save).toHaveBeenCalledWith(dishEntity);
                expect(dishEntityMapper.toDish).toHaveBeenCalledWith(expectedDishEntity);
            });
        });

        describe('Failure', () => {
            it('should throw Error', async () => {
                const dish: Dish = VALID_DISH_NO_ID;
                const dishEntity: DishEntity = VALID_DISH_ENTITY_NO_ID;

                jest.spyOn(console, 'error').mockImplementation(() => { });
                jest.spyOn(dishEntityMapper, 'toDishEntity').mockReturnValue(dishEntity);
                jest.spyOn(dishRepository, 'save').mockRejectedValue(new Error());

                await expect(dishAdapter.saveDish(dish)).rejects.toThrow(Error);
                expect(dishEntityMapper.toDishEntity).toHaveBeenCalledWith(dish);
            });
        });
    });

    describe('getDish', () => {
        describe('Success', () => {
            it('should get a dish with given id', async () => {
                const expectedDishEntity: DishEntity = VALID_DISH_ENTITY;
                const expectedDish: Dish = VALID_DISH;

                jest.spyOn(dishRepository, 'findOneById').mockResolvedValue(expectedDishEntity);
                jest.spyOn(dishEntityMapper, 'toDish').mockReturnValue(expectedDish);

                const result = await dishAdapter.getDish(expectedDishEntity.id);

                expect(result).toEqual(expectedDish);
                expect(dishRepository.findOneById).toHaveBeenCalledWith(expectedDishEntity.id);
                expect(dishEntityMapper.toDish).toHaveBeenCalledWith(expectedDishEntity);
            });
        });

        describe('Failure', () => {
            it('should throw DishNotFoundException if dish does not exists', async () => {
                jest.spyOn(dishRepository, 'findOneById').mockReturnValue(null);

                await expect(dishAdapter.getDish('id')).rejects.toThrow(DishNotFoundException);
                expect(dishRepository.findOneById).toHaveBeenCalledWith('id');
            });
        });
    });
});
