import { Module } from '@nestjs/common';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './restaurants/infrastructure/persistence/typeorm/entities/restaurant.entity';

@Module({
    imports: [
        RestaurantsModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'root',
            password: 'root',
            database: 'test',
            entities: [RestaurantEntity],
            synchronize: true,
        })
    ]
})
export class AppModule { }
