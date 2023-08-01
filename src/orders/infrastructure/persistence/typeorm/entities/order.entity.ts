import { Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { OrderItemEntity } from './orderItem.entity';
import { RestaurantEntity } from '../../../../../restaurants/infrastructure/persistence/typeorm/entities/restaurant.entity';

@Entity('Order')
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    clientId: string;
    
    @Column()
    status: string;

    @ManyToOne(/* istanbul ignore next */() => RestaurantEntity, /* istanbul ignore next */(restaurant) => restaurant, {
        eager: true,
        nullable: false,
    })
    @JoinColumn({ name: 'restaurantId' })
    restaurant: RestaurantEntity;

    @OneToMany(/* istanbul ignore next */() => OrderItemEntity, /* istanbul ignore next */(orderItem) => orderItem.order, {
        eager: true,
        cascade: true
    })
    orderItems: OrderItemEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}