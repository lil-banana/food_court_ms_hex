import { Inject, Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Dish } from '../../domain/models/dish.model';
import { DishRequest } from './dtos/dishRequest.dto';
import { CREATE_DISH_USE_CASE, ICreateDishUseCase } from '../../domain/interfaces/createDish.interface';
import { DishRequestMapper } from './mappers/dishRequest.mapper';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { DishIdDto } from './dtos/dishIdDto.dto';
import { DishIdDtoMapper } from './mappers/dishIdDto.mapper';

@ApiTags('dishes')
@Controller('dishes')
@UseFilters(new HttpExceptionFilter())
export class DishController {
    private readonly dishRequestMapper = new DishRequestMapper();
    private readonly dishIdDtoMapper = new DishIdDtoMapper();
    constructor(
        @Inject(CREATE_DISH_USE_CASE) private readonly createDishUseCase: ICreateDishUseCase
    ) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Creates a new dish', type: DishIdDto })
    async saveDish(@Body() dishRequest: DishRequest): Promise<DishIdDto> {
        const dish: Dish = this.dishRequestMapper.toDish(dishRequest);
        const savedDish: Dish = await this.createDishUseCase.saveDish(dish, 'eb2c393d-b54c-435b-aea7-eb49317c3a6b');
        return this.dishIdDtoMapper.toDishIdDto(savedDish);
    }
}