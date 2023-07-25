import { Dish } from '../../../domain/models/dish.model';
import { DishUpdate } from '../dtos/dishUpdate.dto';

export class DishUpdateMapper {
    toDishPartial(dishUpdate: DishUpdate): Partial<Dish> {
        return {
            price: dishUpdate.price,
            description: dishUpdate.description,
        };
    }
}