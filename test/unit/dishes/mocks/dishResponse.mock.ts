import { DishResponse } from '../../../../src/dishes/infrastructure/controllers/dtos/dishResponse.dto';
import { VALID_DISH } from './dish.mock';

export const VALID_DISH_RESPONSE: DishResponse = {
    id: VALID_DISH.id,
    name: VALID_DISH.name,
    price: VALID_DISH.price,
    description: VALID_DISH.description,
    imageUrl: VALID_DISH.imageUrl,
    category: VALID_DISH.category.name
};