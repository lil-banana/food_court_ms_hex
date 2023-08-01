import { DishQuantityDto } from "../../../../src/orders/infrastructure/controllers/dtos/dishQuantity.dto";
import { VALID_ORDER_ITEM } from "./orderItem.mock";

export const VALID_DISH_QUANTITY: DishQuantityDto = {
    dishId: VALID_ORDER_ITEM.dish.id,
    quantity: VALID_ORDER_ITEM.quantity
};