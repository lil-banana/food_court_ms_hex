import { RestaurantName } from '../../../../../../src/restaurants/domain/models/value-objects/restaurantName.vo';
import { InvalidArgumentError } from '../../../../../../src/restaurants/domain/exceptions/invalidArgumentError.exception';

describe('Restaurant Name Value Object', () => {
    describe('Success', () => {
        it('should create a new Restaurant Name with a valid value', () => {
            const validName = 'Restaurant1';
            const restaurantName = new RestaurantName(validName);

            expect(restaurantName.value).toEqual(validName);
        });
    });

    describe('Failure', () => {
        it('should throw an error when creating a Restaurant Name with an undefined value', () => {
            expect(() => {
                new RestaurantName(undefined);
            }).toThrow(InvalidArgumentError);
        });

        it('should throw an error when creating a Restaurant Name with a null value', () => {
            expect(() => {
                new RestaurantName(null);
            }).toThrow(InvalidArgumentError);
        });

        it('should throw an error when creating a Restaurant Name with an empty string value', () => {
            expect(() => {
                new RestaurantName('');
            }).toThrow(InvalidArgumentError);
        });

        it('should throw an error when creating a Restaurant Name with an invalid value', () => {
            const invalidName = '1';
            expect(() => {
                new RestaurantName(invalidName);
            }).toThrow(InvalidArgumentError);
        });
    });

});
