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
            dishEntity.price,
            dishEntity.description,
            dishEntity.imageUrl,
            this.categoryEntityMapper.toCategory(dishEntity.category),
            this.restaurantEntityMapper.toRestaurant(dishEntity.restaurant),
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
        dishEntity.category = this.categoryEntityMapper.toCategoryEntity(dish.category);
        dishEntity.restaurant = this.restaurantEntityMapper.toRestaurantEntity(dish.restaurant);
        dishEntity.active = dish.active;
        return dishEntity;
    }
}