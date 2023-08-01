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
import { MODIFY_DISH_USE_CASE } from './domain/interfaces/modifyDish.interface';
import { ModifyDishUseCase } from './application/usecases/modifyDish.usecase';
import { ACTIVATE_DEACTIVATE_DISH_USE_CASE } from './domain/interfaces/activateDeactivateDish.interface';
import { ActivateDeactivateDishUseCase } from './application/usecases/activateDeactivateDish.usecase';
import { AuthModule } from '../auth/auth.module';
import { GET_DISHES_USE_CASE } from './domain/interfaces/getDishes.interface';
import { GetDishesUseCase } from './application/usecases/getDishes.usecase';

@Module({
    imports: [
        RestaurantsModule,
        AuthModule,
        TypeOrmModule.forFeature([CategoryEntity, DishEntity]),
        HttpModule
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
        },
        {
            provide: MODIFY_DISH_USE_CASE,
            useClass: ModifyDishUseCase,
        },
        {
            provide: ACTIVATE_DEACTIVATE_DISH_USE_CASE,
            useClass: ActivateDeactivateDishUseCase,
        },
        {
            provide: GET_DISHES_USE_CASE,
            useClass: GetDishesUseCase,
        }
    ],
    exports: [ DISH_PERSISTENCE_PORT ]
})
export class DishesModule { }
