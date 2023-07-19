import { Inject, Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Restaurant } from 'src/restaurants/domain/models/restaurant.model';
import { RestaurantRequest } from './dtos/restaurantRequest.dto';
import { RestaurantResponse } from './dtos/restaurantResponse.dto';
import { CREATE_RESTAURANT_USE_CASE, ICreateRestaurantUseCase } from '../../domain/interfaces/createRestaurant.interface';
import { RestaurantRequestMapper } from './mappers/restaurantRequest.mapper';
import { RestaurantResponseMapper } from './mappers/restaurantResponse.mapper';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@ApiTags('restaurants')
@Controller('restaurants')
@UseFilters(new HttpExceptionFilter())
export class RestaurantController {
    private readonly restaurantRequestMapper = new RestaurantRequestMapper();
    private readonly restaurantResponseMapper = new RestaurantResponseMapper();
    constructor(
        @Inject(CREATE_RESTAURANT_USE_CASE) private readonly createRestaurantUseCase: ICreateRestaurantUseCase
    ) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Creates a new restaurant', type: RestaurantResponse })
    async saveRestaurant(@Body() restaurantRequest: RestaurantRequest): Promise<RestaurantResponse> {
        const restaurant: Restaurant = this.restaurantRequestMapper.toRestaurant(restaurantRequest);
        const savedRestaurant: Restaurant = await this.createRestaurantUseCase.saveRestaurant(restaurant);
        return this.restaurantResponseMapper.toRestaurantResponse(savedRestaurant);
    }
}