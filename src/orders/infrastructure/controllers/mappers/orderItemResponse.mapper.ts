import { DishResponseMapper } from '../../../../dishes/infrastructure/controllers/mappers/dishReponse.mapper';
import { OrderItem } from '../../../domain/models/orderItem.model';
import { OrderItemResponse } from '../dtos/orderItemResponse.dto';

export class OrderItemResponseMapper {
    private readonly dishResponseMapper = new DishResponseMapper();

    toOrderItemResponse(orderItem: OrderItem): OrderItemResponse {
        const orderItemResponse: OrderItemResponse = new OrderItemResponse();
        orderItemResponse.dish = this.dishResponseMapper.toDishResponse(orderItem.dish);
        orderItemResponse.quantity = orderItem.quantity;
        return orderItemResponse;
    }

    toOrderItemResponseList(orderItemList: OrderItem[]): OrderItemResponse[] {
        return orderItemList.map(orderItem => this.toOrderItemResponse(orderItem));
    }
}