import { Order } from '../../../../domain/models/order.model';
import { OrderEntity } from '../entities/order.entity';
import { RestaurantEntityMapper } from '../../../../../restaurants/infrastructure/persistence/typeorm/mappers/restaurantEntity.mapper';
import { OrderItemEntityMapper } from './orderItemEntity.mapper';

export class OrderEntityMapper {
    private readonly orderItemEntityMapper: OrderItemEntityMapper = new OrderItemEntityMapper();
    private readonly restaurantEntityMapper: RestaurantEntityMapper = new RestaurantEntityMapper();

    toOrder(orderEntity: OrderEntity): Order {
        const order: Order = new Order(
            orderEntity.id,
            orderEntity.clientId,
            this.restaurantEntityMapper.toRestaurant(orderEntity.restaurant),
            this.orderItemEntityMapper.toOrderItemList(orderEntity.orderItems),
            orderEntity.status
        );
        return order;
    }

    toOrderList(orderEntityList: OrderEntity[]): Order[] {
        return orderEntityList.map(orderEntity => this.toOrder(orderEntity));
    }

    toOrderEntity(order: Order): OrderEntity {
        const orderEntity: OrderEntity = new OrderEntity();
        orderEntity.id = order.id;
        orderEntity.clientId = order.clientId;
        orderEntity.status = order.status;
        orderEntity.restaurant = this.restaurantEntityMapper.toRestaurantEntity(order.restaurant);
        orderEntity.orderItems = this.orderItemEntityMapper.toOrderItemEntityList(order.items);
        return orderEntity;
    }
}