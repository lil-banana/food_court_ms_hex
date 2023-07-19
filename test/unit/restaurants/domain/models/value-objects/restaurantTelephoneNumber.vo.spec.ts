import { RestaurantTelephoneNumber } from '../../../../../../src/restaurants/domain/models/value-objects/restaurantTelephoneNumber.vo';
import { InvalidArgumentError } from '../../../../../../src/restaurants/domain/exceptions/invalidArgumentError.exception';

describe('Restaurant TelephoneNumber Value Object', () => {
    describe('Success', () => {
        it('should create a new Restaurant Telephone Number with a valid value', () => {
            const validTelephoneNumber = '+1234567890';
            const restaurantTelephoneNumber = new RestaurantTelephoneNumber(validTelephoneNumber);

            expect(restaurantTelephoneNumber.value).toEqual(validTelephoneNumber);
        });
    });

    describe('Failure', () => {
        it('should throw an error when creating a Restaurant Telephone Number with an undefined value', () => {
            expect(() => {
                new RestaurantTelephoneNumber(undefined);
            }).toThrow(InvalidArgumentError);
        });

        it('should throw an error when creating a Restaurant Telephone Number with a null value', () => {
            expect(() => {
                new RestaurantTelephoneNumber(null);
            }).toThrow(InvalidArgumentError);
        });

        it('should throw an error when creating a Restaurant Telephone Number with an empty string value', () => {
            expect(() => {
                new RestaurantTelephoneNumber('');
            }).toThrow(InvalidArgumentError);
        });

        it('should throw an error when creating a Restaurant Telephone Number with an invalid value', () => {
            const invalidTelephoneNumber = '+12345678901234';
            expect(() => {
                new RestaurantTelephoneNumber(invalidTelephoneNumber);
            }).toThrow(InvalidArgumentError);
        });
    });

});
