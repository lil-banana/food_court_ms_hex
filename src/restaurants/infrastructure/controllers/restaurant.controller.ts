import { Inject, Body, Controller, Post, UseFilters, ValidationPipe, UseGuards, Get, Query } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Restaurant } from '../../../../src/restaurants/domain/models/restaurant.model';
import { RestaurantRequest } from './dtos/restaurantRequest.dto';
import { RestaurantIdDto } from './dtos/restaurantId.dto';
import { CREATE_RESTAURANT_USE_CASE, ICreateRestaurantUseCase } from '../../domain/interfaces/createRestaurant.interface';
import { RestaurantRequestMapper } from './mappers/restaurantRequest.mapper';
import { RestaurantIdDtoMapper } from './mappers/restaurantId.mapper';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AdminGuard } from '../../../auth/infrastructure/controllers/guards/admin.guard';
import { PaginationDto } from './dtos/pagination.dto';
import { GET_RESTAURANTS_USE_CASE, IGetRestaurantsUseCase } from '../../domain/interfaces/getRestaurants.interface';
import { PaginationDtoMapper } from './mappers/pagination.mapper';
import { RestaurantResponse } from './dtos/restaurantResponse.dto';
import { RestaurantResponseMapper } from './mappers/restaurantResponse.mapper';
import { ClientGuard } from '../../../auth/infrastructure/controllers/guards/client.guard';

@ApiTags('restaurants')
@Controller('restaurants')
@UseFilters(new HttpExceptionFilter())
export class RestaurantController {
    private readonly restaurantRequestMapper = new RestaurantRequestMapper();
    private readonly restaurantIdDtoMapper = new RestaurantIdDtoMapper();
    private readonly paginationDtoMapper = new PaginationDtoMapper();
    private readonly restaurantResponseMapper = new RestaurantResponseMapper();
    constructor(
        @Inject(CREATE_RESTAURANT_USE_CASE) private readonly createRestaurantUseCase: ICreateRestaurantUseCase,
        @Inject(GET_RESTAURANTS_USE_CASE) private readonly getRestaurantsUseCase: IGetRestaurantsUseCase
    ) { }

    @Post()
    @UseGuards(AdminGuard)
    @ApiResponse({ status: 201, description: 'Creates a new restaurant', type: RestaurantIdDto })
    async saveRestaurant(@Body(ValidationPipe) restaurantRequest: RestaurantRequest): Promise<RestaurantIdDto> {
        const restaurant: Restaurant = this.restaurantRequestMapper.toRestaurant(restaurantRequest);
        const savedRestaurant: Restaurant = await this.createRestaurantUseCase.saveRestaurant(restaurant);
        return this.restaurantIdDtoMapper.toRestaurantIdDto(savedRestaurant);
    }

    @Get()
    @UseGuards(ClientGuard)
    @ApiResponse({ status: 200, description: 'Lists restaurants', type: RestaurantIdDto })
    async getRestaurants(@Query() paginationDto: PaginationDto): Promise<RestaurantResponse[]> {
        const { page, limit } = this.paginationDtoMapper.toPagination(paginationDto);
        return this.restaurantResponseMapper.toRestaurantResponseList( await this.getRestaurantsUseCase.getRestaurants(page, limit) );
    }
}