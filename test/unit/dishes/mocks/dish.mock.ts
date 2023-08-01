import { Dish } from '../../../../src/dishes/domain/models/dish.model';
import { OTHER_RESTAURANT, VALID_RESTAURANT } from '../../restaurants/mocks/restaurant.mock';
import { SOUP_CATEGORY, OTHER_CATEGORY, ID_CATEGORY } from './category.mock';

export const VALID_DISH = new Dish(
    '99480ce4-ecfc-40be-a0c8-66e9d95a983e',
    'Dish1',
    'one dish',
    'http://image',
    SOUP_CATEGORY,
    VALID_RESTAURANT,
    1000
);

export const VALID_DISH_NO_ID = new Dish(
    undefined,
    'Dish1',
    'one dish',
    'http://image',
    SOUP_CATEGORY,
    VALID_RESTAURANT,
    1000
);

export const VALID_DISH_NO_ID_NO_RESTAURANT = new Dish(
    undefined,
    'Dish1',
    'one dish',
    'http://image',
    SOUP_CATEGORY,
    undefined,
    1000
);

export const VALID_DISH_NO_ID_NO_RESTAURANT_ID_CATEGORY = new Dish(
    undefined,
    'Dish1',
    'one dish',
    'http://image',
    ID_CATEGORY,
    undefined,
    1000
);

export const OTHER_DISH = new Dish(
    '02294fc5-cb9e-4dd8-b6cf-bddbb5efc107',
    'Dish2',
    'other dish',
    'http://other.image',
    OTHER_CATEGORY,
    OTHER_RESTAURANT,
    2000
);

export const VALID_DISH_PARTIAL = {
    price: OTHER_DISH.price,
    description: OTHER_DISH.description
};

export const VALID_DISH_PARTIAL_VOID = {};

export const VALID_DISH_UPDATED = new Dish(
    VALID_DISH.id,
    VALID_DISH.name,
    OTHER_DISH.description,
    VALID_DISH.imageUrl,
    VALID_DISH.category,
    VALID_DISH.restaurant,
    OTHER_DISH.price
);

export const VALID_DISH_ONLY_ID = new Dish(
    VALID_DISH.id,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
);

export const DEACTIVATED_DISH = new Dish(
    VALID_DISH.id,
    VALID_DISH.name,
    VALID_DISH.description,
    VALID_DISH.imageUrl,
    VALID_DISH.category,
    VALID_DISH.restaurant,
    VALID_DISH.price,
    false
);