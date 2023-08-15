import { Inject, Body, Controller, Post, UseFilters, ValidationPipe, UseGuards, Request, Get, Query } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Order } from '../../domain/models/order.model';
import { OrderRequest } from './dtos/orderRequest.dto';
import { CREATE_ORDER_USE_CASE, ICreateOrderUseCase } from '../../domain/interfaces/createOrder.interface';
import { GET_ORDERS_USE_CASE, IGetOrdersUseCase } from '../../domain/interfaces/getOrders.interface';
import { OrderRequestMapper } from './mappers/orderRequest.mapper';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { OrderIdDto } from './dtos/orderIdDto.dto';
import { OrderIdDtoMapper } from './mappers/orderIdDto.mapper';
import { ClientGuard } from '../../../auth/infrastructure/controllers/guards/client.guard';
import { EmployeeGuard } from '../../../auth/infrastructure/controllers/guards/employee.guard';
import { QueryOptionsDtoMapper } from './mappers/queryOptions.mapper';
import { QueryOptionsDto } from './dtos/queryOptions.dto';
import { OrderResponse } from './dtos/orderResponse.dto';
import { OrderResponseMapper } from './mappers/orderResponse.mapper';

@ApiTags('orders')
@Controller('orders')
@UseFilters(new HttpExceptionFilter())
export class OrderController {
    private readonly orderRequestMapper = new OrderRequestMapper();
    private readonly orderIdDtoMapper = new OrderIdDtoMapper();
    private readonly queryOptionsDtoMapper = new QueryOptionsDtoMapper();
    private readonly orderResponseMapper = new OrderResponseMapper();

    constructor(
        @Inject(CREATE_ORDER_USE_CASE) private readonly createOrderUseCase: ICreateOrderUseCase,
        @Inject(GET_ORDERS_USE_CASE) private readonly getOrdersUseCase: IGetOrdersUseCase
    ) { }

    @Post()
    @UseGuards(ClientGuard)
    @ApiResponse({ status: 201, description: 'Creates a new order', type: OrderIdDto })
    async saveOrder(@Body(ValidationPipe) orderRequest: OrderRequest, @Request() request: any): Promise<OrderIdDto> {
        const order: Order = this.orderRequestMapper.toOrder(orderRequest, request.user.userId);
        const orderId: string = await this.createOrderUseCase.saveOrder(order);
        return this.orderIdDtoMapper.toOrderIdDto(orderId);
    }

    @Get()
    @UseGuards(EmployeeGuard)
    @ApiResponse({ status: 200, description: 'Gets orders', type: [OrderResponse]})
    async getOrders(@Query(ValidationPipe) queryOptions: QueryOptionsDto, @Request() request: any): Promise<OrderResponse[]> {
        const { status, page, limit } = this.queryOptionsDtoMapper.toQueryOptions(queryOptions);
        return this.orderResponseMapper.toOrderResponseList(await this.getOrdersUseCase.getOrders(request.user.bossId, status, page, limit));
    }
}