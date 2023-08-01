import { OrderItem } from '../../../domain/models/orderItem.model';
import { Dish } from '../../../../dishes/domain/models/dish.model';
import { DishQuantityDto } from '../dtos/dishQuantity.dto';

export class DishQuantityMapper {
    toOrderItem(dishQuantity: DishQuantityDto): OrderItem {
        const orderItem: OrderItem = new OrderItem(
            undefined,
            new Dish(dishQuantity.dishId, undefined, undefined, undefined, undefined, undefined),
            dishQuantity.quantity
        );
        return orderItem;
    }

    toOrderItemList(dishQuantityList: DishQuantityDto[]): OrderItem[] {
        return dishQuantityList.map(dishQuantity => this.toOrderItem(dishQuantity));
    }
}