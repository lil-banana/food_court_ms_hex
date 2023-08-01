import { Module } from '@nestjs/common';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './restaurants/infrastructure/persistence/typeorm/entities/restaurant.entity';
import { DishesModule } from './dishes/dishes.module';
import { CategoryEntity } from './dishes/infrastructure/persistence/typeorm/entities/category.entity';
import { DishEntity } from './dishes/infrastructure/persistence/typeorm/entities/dish.entity';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { OrderEntity } from './orders/infrastructure/persistence/typeorm/entities/order.entity';
import { OrderItemEntity } from './orders/infrastructure/persistence/typeorm/entities/orderItem.entity';

@Module({
    imports: [
        RestaurantsModule,
        DishesModule,
        AuthModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'root',
            password: 'root',
            database: 'test',
            entities: [RestaurantEntity, CategoryEntity, DishEntity, OrderEntity, OrderItemEntity],
            synchronize: true,
        }),
        OrdersModule
    ]
})
export class AppModule { }
