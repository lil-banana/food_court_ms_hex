import { DishPrice } from '../../../../../../src/dishes/domain/models/value-objects/dishPrice.vo';
import { InvalidArgumentError } from '../../../../../../src/dishes/domain/exceptions/invalidArgumentError.exception';

describe('Dish Price Value Object', () => {
    describe('Success', () => {
        it('should create a new Dish Price with a valid value', () => {
            const validPrice = 10000;
            const dishPrice = new DishPrice(validPrice);

            expect(dishPrice.value).toEqual(validPrice);
        });
    });

    describe('Failure', () => {
        it('should throw an error when creating a Dish Price with an undefined value', () => {
            expect(() => {
                const _dishPrice = new DishPrice(undefined);
            }).toThrow(InvalidArgumentError);
        });

        it('should throw an error when creating a Dish Price with a null value', () => {
            expect(() => {
                const _dishPrice = new DishPrice(null);
            }).toThrow(InvalidArgumentError);
        });

        it('should throw an error when creating a Dish Price with an invalid value', () => {
            const invalidPrice = 0;
            expect(() => {
                const _dishPrice = new DishPrice(invalidPrice);
            }).toThrow(InvalidArgumentError);
        });
    });

});
