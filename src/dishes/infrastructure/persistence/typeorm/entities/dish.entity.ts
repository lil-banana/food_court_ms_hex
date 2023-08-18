import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { RestaurantEntity } from '../../../../../restaurants/infrastructure/persistence/typeorm/entities/restaurant.entity';

@Entity('Dish')
export class DishEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column()
    imageUrl: string;

    @ManyToOne(/* istanbul ignore next */() => CategoryEntity, /* istanbul ignore next */(category) => category, {
        eager: true,
        nullable: false,
    })
    @JoinColumn({ name: 'categoryId' })
    category: CategoryEntity;

    @ManyToOne(/* istanbul ignore next */() => RestaurantEntity, /* istanbul ignore next */(restaurant) => restaurant, {
        eager: true,
        nullable: false,
    })
    @JoinColumn({ name: 'restaurantId' })
    restaurant: RestaurantEntity;

    @Column()
    active: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}