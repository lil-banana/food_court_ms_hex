import { Dish } from '../../../../../src/dishes/domain/models/dish.model';
import { VALID_DISH, OTHER_DISH } from '../../mocks/dish.mock';

describe('Dish Model', () => {
    describe('Success', () => {
        it('should create a new dish with valid arguments', () => {
            const dish: Dish = new Dish(VALID_DISH.id, VALID_DISH.name, VALID_DISH.description, VALID_DISH.imageUrl, VALID_DISH.category, VALID_DISH.restaurant, VALID_DISH.price);
            expect(dish.id).toBe(VALID_DISH.id);
            expect(dish.name).toBe(VALID_DISH.name);
            expect(dish.price).toBe(VALID_DISH.price);
            expect(dish.description).toBe(VALID_DISH.description);
            expect(dish.imageUrl).toBe(VALID_DISH.imageUrl);
            expect(dish.category).toEqual(VALID_DISH.category);
            expect(dish.restaurant).toBe(VALID_DISH.restaurant);
        });

        it('should create a new dish with valid arguments when not given price', () => {
            const dish: Dish = new Dish(VALID_DISH.id, VALID_DISH.name, VALID_DISH.description, VALID_DISH.imageUrl, VALID_DISH.category, VALID_DISH.restaurant);
            expect(dish.id).toBe(VALID_DISH.id);
            expect(dish.name).toBe(VALID_DISH.name);
            expect(dish.description).toBe(VALID_DISH.description);
            expect(dish.imageUrl).toBe(VALID_DISH.imageUrl);
            expect(dish.category).toEqual(VALID_DISH.category);
            expect(dish.restaurant).toBe(VALID_DISH.restaurant);
            expect(dish.price).toBe(undefined);
        });

        it('should update dish description', () => {
            const dish: Dish = VALID_DISH;
            dish.description = OTHER_DISH.description;

            expect(dish.description).toBe(OTHER_DISH.description);
        });

        it('should update dish price', () => {
            const dish = VALID_DISH;
            dish.price = OTHER_DISH.price;

            expect(dish.price).toBe(OTHER_DISH.price);
        });

        it('should update other values', () => {
            const dish: Dish = VALID_DISH;
            dish.restaurant = OTHER_DISH.restaurant;
            dish.active = undefined;
            dish.active = true;

            expect(dish.restaurant).toBe(OTHER_DISH.restaurant);
            expect(dish.active).toBe(true);
        });
    });
});