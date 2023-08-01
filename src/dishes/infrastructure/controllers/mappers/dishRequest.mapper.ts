import { Dish } from '../../../domain/models/dish.model';
import { DishRequest } from '../dtos/dishRequest.dto';
import { Category } from '../../../domain/models/category.model';

export class DishRequestMapper {
    toDish(dishRequest: DishRequest): Dish {
        const dish: Dish = new Dish(
            undefined,
            dishRequest.name,
            dishRequest.description,
            dishRequest.imageUrl,
            new Category(dishRequest.categoryId, undefined, undefined),
            undefined,
            dishRequest.price
        );
        return dish;
    }
}