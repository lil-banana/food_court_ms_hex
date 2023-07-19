import { RestaurantNit } from '../../../../../../src/restaurants/domain/models/value-objects/restaurantNit.vo';
import { InvalidArgumentError } from '../../../../../../src/restaurants/domain/exceptions/invalidArgumentError.exception';

describe('Restaurant Nit Value Object', () => {
    describe('Success', () => {
        it('should create a new Restaurant Nit with a valid value', () => {
            const validNit = '1234567890';
            const restaurantNit = new RestaurantNit(validNit);

            expect(restaurantNit.value).toEqual(validNit);
        });
    });

    describe('Failure', () => {
        it('should throw an error when creating a Restaurant Nit with an undefined value', () => {
            expect(() => {
                new RestaurantNit(undefined);
            }).toThrow(InvalidArgumentError);
        });

        it('should throw an error when creating a Restaurant Nit with a null value', () => {
            expect(() => {
                new RestaurantNit(null);
            }).toThrow(InvalidArgumentError);
        });

        it('should throw an error when creating a Restaurant Nit with an empty string value', () => {
            expect(() => {
                new RestaurantNit('');
            }).toThrow(InvalidArgumentError);
        });

        it('should throw an error when creating a Restaurant Nit with an invalid value', () => {
            const invalidNit = 'abc';
            expect(() => {
                new RestaurantNit(invalidNit);
            }).toThrow(InvalidArgumentError);
        });
    });

});
