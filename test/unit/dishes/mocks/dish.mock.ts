import { Dish } from '../../../../src/dishes/domain/models/dish.model';
import { OTHER_RESTAURANT, VALID_RESTAURANT } from '../../restaurants/mocks/restaurant.mock';
import { SOUP_CATEGORY, OTHER_CATEGORY, ID_CATEGORY } from './category.mock';

export const VALID_DISH = new Dish(
    '99480ce4-ecfc-40be-a0c8-66e9d95a983e',
    'Dish1',
    1000,
    'one dish',
    'http://image',
    SOUP_CATEGORY,
    VALID_RESTAURANT
);

export const VALID_DISH_NO_ID = new Dish(
    undefined,
    'Dish1',
    1000,
    'one dish',
    'http://image',
    SOUP_CATEGORY,
    VALID_RESTAURANT
);

export const VALID_DISH_NO_ID_NO_RESTAURANT = new Dish(
    undefined,
    'Dish1',
    1000,
    'one dish',
    'http://image',
    SOUP_CATEGORY,
    undefined
);

export const VALID_DISH_NO_ID_NO_RESTAURANT_ID_CATEGORY = new Dish(
    undefined,
    'Dish1',
    1000,
    'one dish',
    'http://image',
    ID_CATEGORY,
    undefined
);

export const OTHER_DISH = new Dish(
    '02294fc5-cb9e-4dd8-b6cf-bddbb5efc107',
    'Dish2',
    2000,
    'other dish',
    'http://other.image',
    OTHER_CATEGORY,
    OTHER_RESTAURANT
);