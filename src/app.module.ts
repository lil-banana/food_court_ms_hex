import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE} from './envs';


@Module({
    imports: [
        ConfigModule.forRoot(),
        RestaurantsModule,
        DishesModule,
        AuthModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: DB_HOST,
            port: DB_PORT,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            database: DB_DATABASE,
            entities: [RestaurantEntity, CategoryEntity, DishEntity, OrderEntity, OrderItemEntity],
            synchronize: true,
        }),
        OrdersModule
    ]
})
export class AppModule { }