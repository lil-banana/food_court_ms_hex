import { Dish } from '../../../../domain/models/dish.model';
import { DishEntity } from '../entities/dish.entity';
import { CategoryEntityMapper } from './categoryEntity.mapper';
import { RestaurantEntityMapper } from '../../../../../restaurants/infrastructure/persistence/typeorm/mappers/restaurantEntity.mapper';

export class DishEntityMapper {
    private readonly categoryEntityMapper: CategoryEntityMapper = new CategoryEntityMapper();
    private readonly restaurantEntityMapper: RestaurantEntityMapper = new RestaurantEntityMapper();

    toDish(dishEntity: DishEntity): Dish {
        const dish: Dish = new Dish(
            dishEntity.id,
            dishEntity.name,
            dishEntity.description,
            dishEntity.imageUrl,
            dishEntity.category ? this.categoryEntityMapper.toCategory(dishEntity.category): undefined,
            dishEntity.restaurant ? this.restaurantEntityMapper.toRestaurant(dishEntity.restaurant): undefined,
            dishEntity.price,
            dishEntity.active
        );
        return dish;
    }

    toDishList(dishEntityList: DishEntity[]): Dish[] {
        return dishEntityList.map(dishEntity => this.toDish(dishEntity));
    }

    toDishEntity(dish: Dish): DishEntity {
        const dishEntity: DishEntity = new DishEntity();
        dishEntity.id = dish.id;
        dishEntity.name = dish.name;
        dishEntity.price = dish.price;
        dishEntity.description = dish.description;
        dishEntity.imageUrl = dish.imageUrl;
        dishEntity.category = dish.category ? this.categoryEntityMapper.toCategoryEntity(dish.category): undefined;
        dishEntity.restaurant = dish. restaurant ? this.restaurantEntityMapper.toRestaurantEntity(dish.restaurant): undefined;
        dishEntity.active = dish.active;
        return dishEntity;
    }
}