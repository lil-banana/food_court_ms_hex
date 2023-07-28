import { Dish } from '../../../domain/models/dish.model';
import { DishResponse } from '../dtos/dishResponse.dto';

export class DishResponseMapper {
    toDishResponse(dish: Dish): DishResponse {
        const dishResponse: DishResponse = new DishResponse();
        dishResponse.id = dish.id;
        dishResponse.name = dish.name;
        dishResponse.price = dish.price;
        dishResponse.description = dish.description;
        dishResponse.imageUrl = dish.imageUrl;
        dishResponse.category = dish.category.name;
        return dishResponse;
    }

    toDishResponseList(dishList: Dish[]): DishResponse[] {
        return dishList.map(dish => this.toDishResponse(dish));
    }
}