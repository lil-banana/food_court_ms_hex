import { Restaurant } from '../../../../src/restaurants/domain/models/restaurant.model';

export const VALID_RESTAURANT = new Restaurant(
    'f8a8ae51-f0f8-485b-998d-088ada3b047d',
    'street 1',
    'http://route.to.image',
    '6f992c64-941c-4503-8d64-9d28b6159ace',
    'Restaurant',
    '1234567890',
    '+1234567890'
);

export const VALID_RESTAURANT_NO_ID = new Restaurant(
    undefined,
    'street 1',
    'http://route.to.image',
    '6f992c64-941c-4503-8d64-9d28b6159ace',
    'Restaurant',
    '1234567890',
    '+1234567890'
);

export const VALID_RESTAURANT_ONLY_ID = new Restaurant(
    VALID_RESTAURANT.id,
    undefined,
    undefined,
    undefined
);

export const OTHER_RESTAURANT = new Restaurant(
    'b4132fe6-3ced-405c-a886-af0d63916965',
    'street 2',
    'http://route.to.other.image',
    'cb203541-efee-4c4f-9149-78d11b9585de',
    'Restaurant1',
    '12345678901',
    '+12345678901'
);