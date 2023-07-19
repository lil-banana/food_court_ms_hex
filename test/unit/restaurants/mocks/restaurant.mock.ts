import { Restaurant } from '../../../../src/restaurants/domain/models/restaurant.model';

export const VALID_RESTAURANT = new Restaurant(
    'f8a8ae51-f0f8-485b-998d-088ada3b047d',
    'Restaurant',
    '1234567890',
    'street 1',
    '+1234567890',
    'http://route.to.image',
    '6f992c64-941c-4503-8d64-9d28b6159ace'
);

export const VALID_RESTAURANT_NO_ID = new Restaurant(
    undefined,
    'Restaurant',
    '1234567890',
    'street 1',
    '+1234567890',
    'http://route.to.image',
    '6f992c64-941c-4503-8d64-9d28b6159ace'
);

export const OTHER_RESTAURANT = new Restaurant(
    'b4132fe6-3ced-405c-a886-af0d63916965',
    'Restaurant1',
    '12345678901',
    'street 2',
    '+12345678901',
    'http://route.to.other.image',
    'cb203541-efee-4c4f-9149-78d11b9585de'
);