import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';
import { OrderEntity } from './infrastructure/persistence/typeorm/entities/order.entity';
import { OrderItemEntity } from './infrastructure/persistence/typeorm/entities/orderItem.entity';
import { OrderController } from './infrastructure/controllers/order.controller';
import { OrderAdapter } from './infrastructure/persistence/typeorm/adapters/order.adapter';
import { ORDER_PERSISTENCE_PORT } from './domain/repositories/order.repository';
import { CreateOrderUseCase } from './application/usecases/createOrder.usecase';
import { CREATE_ORDER_USE_CASE } from './domain/interfaces/createOrder.interface';
import { OrderRepository } from './infrastructure/persistence/typeorm/repositories/order.repository';
import { DishesModule } from 'src/dishes/dishes.module';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
        HttpModule,
        DishesModule
    ],
    controllers: [OrderController],
    providers: [
        OrderRepository,
        {
            provide: ORDER_PERSISTENCE_PORT,
            useClass: OrderAdapter,
        },
        {
            provide: CREATE_ORDER_USE_CASE,
            useClass: CreateOrderUseCase,
        }
    ]
})
export class OrdersModule {}
