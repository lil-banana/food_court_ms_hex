import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { DishEntity } from '../../../../../dishes/infrastructure/persistence/typeorm/entities/dish.entity';

@Entity('OrderItem')
export class OrderItemEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    quantity: number;

    @ManyToOne(/* istanbul ignore next */() => OrderEntity, /* istanbul ignore next */(order) => order.orderItems)
    @JoinColumn({ name: 'orderId' })
    order: OrderEntity;

    @ManyToOne(/* istanbul ignore next */() => DishEntity, /* istanbul ignore next */(dish) => dish, {
        eager: true,
        nullable: false,
    })
    @JoinColumn({ name: 'dishId' })
    dish: DishEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}