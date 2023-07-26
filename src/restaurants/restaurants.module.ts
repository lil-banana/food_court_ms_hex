import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantController } from './infrastructure/controllers/restaurant.controller';
import { RestaurantEntity } from './infrastructure/persistence/typeorm/entities/restaurant.entity';
import { CreateRestaurantUseCase } from './application/usecases/createRestaurant.usecase';
import { RestaurantAdapter } from './infrastructure/persistence/typeorm/adapters/restaurant.adapter';
import { RestaurantRepository } from './infrastructure/persistence/typeorm/repositories/restaurant.repository';
import { RESTAURANT_PERSISTENCE_PORT } from './domain/repositories/restaurant.repository';
import { CREATE_RESTAURANT_USE_CASE } from './domain/interfaces/createRestaurant.interface';
import { HttpModule } from '@nestjs/axios';
import { USERS_SERVICE_PORT } from './domain/services/user.service';
import { UsersService } from './infrastructure/services/axios/users.service';
import { UsersApi } from './infrastructure/services/axios/apis/users.api';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([RestaurantEntity]),
        HttpModule
    ],
    controllers: [RestaurantController],
    providers: [
        CreateRestaurantUseCase,
        RestaurantAdapter,
        RestaurantRepository,
        UsersApi,
        {
            provide: RESTAURANT_PERSISTENCE_PORT,
            useClass: RestaurantAdapter,
        },
        {
            provide: CREATE_RESTAURANT_USE_CASE,
            useClass: CreateRestaurantUseCase,
        },
        {
            provide: USERS_SERVICE_PORT,
            useClass: UsersService,
        }
    ],
    exports: [RESTAURANT_PERSISTENCE_PORT]
})
export class RestaurantsModule {}
