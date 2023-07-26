import { Inject, Body, Controller, Post, UseFilters, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Restaurant } from 'src/restaurants/domain/models/restaurant.model';
import { RestaurantRequest } from './dtos/restaurantRequest.dto';
import { RestaurantIdDto } from './dtos/restaurantId.dto';
import { CREATE_RESTAURANT_USE_CASE, ICreateRestaurantUseCase } from '../../domain/interfaces/createRestaurant.interface';
import { RestaurantRequestMapper } from './mappers/restaurantRequest.mapper';
import { RestaurantIdDtoMapper } from './mappers/restaurantId.mapper';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AdminGuard } from '../../../auth/infrastructure/controllers/guards/admin.guard';

@ApiTags('restaurants')
@Controller('restaurants')
@UseFilters(new HttpExceptionFilter())
export class RestaurantController {
    private readonly restaurantRequestMapper = new RestaurantRequestMapper();
    private readonly restaurantIdDtoMapper = new RestaurantIdDtoMapper();
    constructor(
        @Inject(CREATE_RESTAURANT_USE_CASE) private readonly createRestaurantUseCase: ICreateRestaurantUseCase
    ) { }

    @Post()
    @UseGuards(AdminGuard)
    @ApiResponse({ status: 201, description: 'Creates a new restaurant', type: RestaurantIdDto })
    async saveRestaurant(@Body(ValidationPipe) restaurantRequest: RestaurantRequest): Promise<RestaurantIdDto> {
        const restaurant: Restaurant = this.restaurantRequestMapper.toRestaurant(restaurantRequest);
        const savedRestaurant: Restaurant = await this.createRestaurantUseCase.saveRestaurant(restaurant);
        return this.restaurantIdDtoMapper.toRestaurantIdDto(savedRestaurant);
    }
}