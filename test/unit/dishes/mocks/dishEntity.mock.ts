import { DishEntity } from '../../../../src/dishes/infrastructure/persistence/typeorm/entities/dish.entity';
import { VALID_DISH } from './dish.mock';
import { SOUP_CATEGORY_ENTITY } from './categoryEntity.mock';
import { VALID_RESTAURANT_ENTITY } from '../../restaurants/mocks/restaurantEntity.mock';

export const VALID_DISH_ENTITY: DishEntity = {
    id: VALID_DISH.id,
    name: VALID_DISH.name,
    price: VALID_DISH.price,
    description: VALID_DISH.description,
    imageUrl: VALID_DISH.imageUrl,
    category: SOUP_CATEGORY_ENTITY,
    restaurant: VALID_RESTAURANT_ENTITY,
    active: true,
    createdAt: undefined,
    updatedAt: undefined
}

export const VALID_DISH_ENTITY_NO_ID: DishEntity = {
    id: undefined,
    name: VALID_DISH.name,
    price: VALID_DISH.price,
    description: VALID_DISH.description,
    imageUrl: VALID_DISH.imageUrl,
    category: SOUP_CATEGORY_ENTITY,
    restaurant: VALID_RESTAURANT_ENTITY,
    active: true,
    createdAt: undefined,
    updatedAt: undefined
}

export const VALID_DISH_ENTITY_ONLY_ID: DishEntity = {
    id: VALID_DISH.id,
    name: undefined,
    price: undefined,
    description: undefined,
    imageUrl: undefined,
    category: undefined,
    restaurant: undefined,
    active: true,
    createdAt: undefined,
    updatedAt: undefined
}