import { DishUpdate } from '../../../../src/dishes/infrastructure/controllers/dtos/dishUpdate.dto';
import { OTHER_DISH } from './dish.mock';

export const VALID_DISH_UPDATE: DishUpdate = {
    price: OTHER_DISH.price,
    description: OTHER_DISH.description
}