import { Dish } from '../../../../../../../src/dishes/domain/models/dish.model';
import { DishEntity } from '../../../../../../../src/dishes/infrastructure/persistence/typeorm/entities/dish.entity';
import { DishEntityMapper } from '../../../../../../../src/dishes/infrastructure/persistence/typeorm/mappers/dishEntity.mapper';
import { VALID_DISH_ENTITY, VALID_DISH_ENTITY_NO_ID } from '../../../../mocks/dishEntity.mock';
import { VALID_DISH, VALID_DISH_NO_ID } from '../../../../mocks/dish.mock';

describe('Dish Entity Mapper', () => {
    let dishEntityMapper: DishEntityMapper;
    let categoryEntityMapper: any;
    let restaurantEntityMapper: any;

    beforeEach(() => {
        categoryEntityMapper = {
            toCategory: jest.fn(),
            toCategoryEntity: jest.fn(),
        };
        restaurantEntityMapper = {
            toRestaurant: jest.fn(),
            toRestaurantEntity: jest.fn(),
        };
        dishEntityMapper = new DishEntityMapper();
        (dishEntityMapper as any).categoryEntityMapper = categoryEntityMapper;
        (dishEntityMapper as any).restaurantEntityMapper = restaurantEntityMapper;
    });

    describe('toDish', () => {
        it('should map DishEntity to Dish', () => {
            const dishEntity: DishEntity = VALID_DISH_ENTITY;
            const expectedDish: Dish = VALID_DISH;
      
            jest.spyOn(categoryEntityMapper, 'toCategory').mockReturnValue(expectedDish.category);
            jest.spyOn(restaurantEntityMapper, 'toRestaurant').mockReturnValue(expectedDish.restaurant);

            const dish = dishEntityMapper.toDish(dishEntity);

            expect(dish).toEqual(expectedDish);
            expect(categoryEntityMapper.toCategory).toHaveBeenCalledWith(dishEntity.category);
            expect(restaurantEntityMapper.toRestaurant).toHaveBeenCalledWith(dishEntity.restaurant);
        });
    });

    describe('toDishEntity', () => {
        it('should map Dish to DishEntity', () => {
            const dish: Dish = VALID_DISH_NO_ID;
            const expectedDishEntity: DishEntity = VALID_DISH_ENTITY_NO_ID;
            
            jest.spyOn(categoryEntityMapper, 'toCategoryEntity').mockReturnValue(expectedDishEntity.category);
            jest.spyOn(restaurantEntityMapper, 'toRestaurantEntity').mockReturnValue(expectedDishEntity.restaurant);

            const dishEntity = dishEntityMapper.toDishEntity(dish);

            expect(dishEntity).toEqual(expectedDishEntity);
            expect(categoryEntityMapper.toCategoryEntity).toHaveBeenCalledWith(dish.category);
            expect(restaurantEntityMapper.toRestaurantEntity).toHaveBeenCalledWith(dish.restaurant);
        });
    });
});