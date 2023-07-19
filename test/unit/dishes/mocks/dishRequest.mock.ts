import { DishRequest } from '../../../../src/dishes/infrastructure/controllers/dtos/dishRequest.dto';
import { VALID_DISH_NO_ID_NO_RESTAURANT_ID_CATEGORY } from './dish.mock';

export const VALID_DISH_REQUEST: DishRequest = {
    name: VALID_DISH_NO_ID_NO_RESTAURANT_ID_CATEGORY.name,
    price: VALID_DISH_NO_ID_NO_RESTAURANT_ID_CATEGORY.price,
    description: VALID_DISH_NO_ID_NO_RESTAURANT_ID_CATEGORY.description,
    imageUrl: VALID_DISH_NO_ID_NO_RESTAURANT_ID_CATEGORY.imageUrl,
    categoryId: VALID_DISH_NO_ID_NO_RESTAURANT_ID_CATEGORY.category.id
}