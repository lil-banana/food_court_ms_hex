import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './infrastructure/persistence/typeorm/entities/category.entity';
import { DishEntity } from './infrastructure/persistence/typeorm/entities/dish.entity';
import { HttpModule } from '@nestjs/axios';
import { DishController } from './infrastructure/controllers/dish.controller';
import { CreateDishUseCase } from './application/usecases/createDish.usecase';
import { DishAdapter } from './infrastructure/persistence/typeorm/adapters/dish.adapter';
import { DishRepository } from './infrastructure/persistence/typeorm/repositories/dish.repository';
import { DISH_PERSISTENCE_PORT } from './domain/repositories/dish.repository';
import { CREATE_DISH_USE_CASE } from './domain/interfaces/createDish.interface';
import { RestaurantsModule } from '../restaurants/restaurants.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryEntity, DishEntity]),
        HttpModule,
        RestaurantsModule
    ],
    controllers: [DishController],
    providers: [
        CreateDishUseCase,
        DishAdapter,
        DishRepository,
        {
            provide: DISH_PERSISTENCE_PORT,
            useClass: DishAdapter,
        },
        {
            provide: CREATE_DISH_USE_CASE,
            useClass: CreateDishUseCase,
        }
    ]
})
export class DishesModule { }
