import { OrderItem } from '../../../../domain/models/orderItem.model';
import { OrderItemEntity } from '../entities/orderItem.entity';
import { DishEntityMapper } from '../../../../../dishes/infrastructure/persistence/typeorm/mappers/dishEntity.mapper';

export class OrderItemEntityMapper {
    private readonly dishEntityMapper: DishEntityMapper = new DishEntityMapper();

    toOrderItem(orderItemEntity: OrderItemEntity): OrderItem {
        const orderItem: OrderItem = new OrderItem(
            orderItemEntity.id,
            this.dishEntityMapper.toDish(orderItemEntity.dish),
            orderItemEntity.quantity
        );
        return orderItem;
    }

    toOrderItemList(orderItemEntityList: OrderItemEntity[]): OrderItem[] {
        return orderItemEntityList.map(orderItemEntity => this.toOrderItem(orderItemEntity));
    }

    toOrderItemEntity(orderItem: OrderItem): OrderItemEntity {
        const orderItemEntity: OrderItemEntity = new OrderItemEntity();
        orderItemEntity.id = orderItem.id;
        orderItemEntity.quantity = orderItem.quantity;
        orderItemEntity.dish = this.dishEntityMapper.toDishEntity(orderItem.dish);
        return orderItemEntity;
    }

    toOrderItemEntityList(orderItemList: OrderItem[]): OrderItemEntity[] {
        return orderItemList.map(orderItem => this.toOrderItemEntity(orderItem));
    }
}