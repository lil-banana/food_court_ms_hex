import { InvalidArgumentError } from '../../../../../src/restaurants/domain/exceptions/invalidArgumentError.exception';
import { Restaurant } from '../../../../../src/restaurants/domain/models/restaurant.model';
import { OTHER_RESTAURANT, VALID_RESTAURANT } from '../../mocks/restaurant.mock';

describe('Restaurant Model', () => {
    describe('Success', () => {
        it('should create a new restaurant with valid arguments', () => {
            const restaurant: Restaurant = new Restaurant(VALID_RESTAURANT.id, VALID_RESTAURANT.name, VALID_RESTAURANT.nit, VALID_RESTAURANT.address, VALID_RESTAURANT.telephoneNumber, VALID_RESTAURANT.logoUrl, VALID_RESTAURANT.ownerId);
            expect(restaurant.id).toBe(VALID_RESTAURANT.id);
            expect(restaurant.name).toBe(VALID_RESTAURANT.name);
            expect(restaurant.nit).toBe(VALID_RESTAURANT.nit);
            expect(restaurant.address).toBe(VALID_RESTAURANT.address);
            expect(restaurant.telephoneNumber).toBe(VALID_RESTAURANT.telephoneNumber);
            expect(restaurant.logoUrl).toEqual(VALID_RESTAURANT.logoUrl);
            expect(restaurant.ownerId).toBe(VALID_RESTAURANT.ownerId);
        });

        it('should update restaurant address', () => {
            const restaurant: Restaurant = VALID_RESTAURANT;
            restaurant.address = OTHER_RESTAURANT.address;

            expect(restaurant.address).toBe(OTHER_RESTAURANT.address);
        });

        it('should update restaurant name', () => {
            const restaurant = VALID_RESTAURANT;
            restaurant.name = OTHER_RESTAURANT.name;

            expect(restaurant.name).toBe(OTHER_RESTAURANT.name);
        });

        it('should update other values', () => {
            const restaurant: Restaurant = VALID_RESTAURANT;
            restaurant.telephoneNumber = OTHER_RESTAURANT.telephoneNumber;
            restaurant.logoUrl = OTHER_RESTAURANT.logoUrl;
            restaurant.ownerId = OTHER_RESTAURANT.ownerId;

            expect(restaurant.telephoneNumber).toBe(OTHER_RESTAURANT.telephoneNumber);
            expect(restaurant.logoUrl).toBe(OTHER_RESTAURANT.logoUrl);
            expect(restaurant.ownerId).toEqual(OTHER_RESTAURANT.ownerId);
        });
    });
});