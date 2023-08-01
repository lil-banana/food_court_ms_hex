import { Inject, Body, Controller, Post, UseFilters, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Order } from '../../domain/models/order.model';
import { OrderRequest } from './dtos/orderRequest.dto';
import { CREATE_ORDER_USE_CASE, ICreateOrderUseCase } from '../../domain/interfaces/createOrder.interface';
import { OrderRequestMapper } from './mappers/orderRequest.mapper';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { OrderIdDto } from './dtos/orderIdDto.dto';
import { OrderIdDtoMapper } from './mappers/orderIdDto.mapper';
import { ClientGuard } from '../../../auth/infrastructure/controllers/guards/client.guard';

@ApiTags('orders')
@Controller('orders')
@UseFilters(new HttpExceptionFilter())
export class OrderController {
    private readonly orderRequestMapper = new OrderRequestMapper();
    private readonly orderIdDtoMapper = new OrderIdDtoMapper();

    constructor(
        @Inject(CREATE_ORDER_USE_CASE) private readonly createOrderUseCase: ICreateOrderUseCase
    ) { }

    @Post()
    @UseGuards(ClientGuard)
    @ApiResponse({ status: 201, description: 'Creates a new order', type: OrderIdDto })
    async saveOrder(@Body(ValidationPipe) orderRequest: OrderRequest, @Request() request: any): Promise<OrderIdDto> {
        const order: Order = this.orderRequestMapper.toOrder(orderRequest, request.user.userId);
        const orderId: string = await this.createOrderUseCase.saveOrder(order);
        return this.orderIdDtoMapper.toOrderIdDto(orderId);
    }
}