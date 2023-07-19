import { Dish } from '../../../domain/models/dish.model';
import { DishIdDto } from '../dtos/dishIdDto.dto';

export class DishIdDtoMapper {
    toDishIdDto(dish: Dish): DishIdDto {
        const dishIdDto: DishIdDto = new DishIdDto();
        dishIdDto.id = dish.id;
        return dishIdDto;
    }
}