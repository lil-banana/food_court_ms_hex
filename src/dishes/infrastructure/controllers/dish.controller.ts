import { Inject, Body, Controller, Post, Patch, UseFilters, Param, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Dish } from '../../domain/models/dish.model';
import { DishRequest } from './dtos/dishRequest.dto';
import { CREATE_DISH_USE_CASE, ICreateDishUseCase } from '../../domain/interfaces/createDish.interface';
import { DishRequestMapper } from './mappers/dishRequest.mapper';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { DishIdDto } from './dtos/dishIdDto.dto';
import { DishIdDtoMapper } from './mappers/dishIdDto.mapper';
import { IModifyDishUseCase, MODIFY_DISH_USE_CASE } from '../../domain/interfaces/modifyDish.interface';
import { DishUpdate } from './dtos/dishUpdate.dto';
import { DishUpdateMapper } from './mappers/dishUpdate.mapper';
import { OwnerGuard } from '../../../auth/infrastructure/controllers/guards/owner.guard';

@ApiTags('dishes')
@Controller('dishes')
@UseFilters(new HttpExceptionFilter())
export class DishController {
    private readonly dishRequestMapper = new DishRequestMapper();
    private readonly dishIdDtoMapper = new DishIdDtoMapper();
    private readonly dishUpdateMapper = new DishUpdateMapper();

    constructor(
        @Inject(CREATE_DISH_USE_CASE) private readonly createDishUseCase: ICreateDishUseCase,
        @Inject(MODIFY_DISH_USE_CASE) private readonly modifyDishUseCase: IModifyDishUseCase
    ) { }

    @Post()
    @UseGuards(OwnerGuard)
    @ApiResponse({ status: 201, description: 'Creates a new dish', type: DishIdDto })
    async saveDish(@Body(ValidationPipe) dishRequest: DishRequest, @Request() request: any): Promise<DishIdDto> {
        const dish: Dish = this.dishRequestMapper.toDish(dishRequest);
        const savedDish: Dish = await this.createDishUseCase.saveDish(dish, request.user.userId);
        return this.dishIdDtoMapper.toDishIdDto(savedDish);
    }

    @Patch(':id')
    @UseGuards(OwnerGuard)
    @ApiResponse({ status: 200, description: 'Modifies the price and description of a dish' })
    async modifyDish(@Param('id') dishId: string, @Body(ValidationPipe) dishUpdate: DishUpdate): Promise<void> {
        const dish: Partial<Dish> = this.dishUpdateMapper.toDishPartial(dishUpdate);
        await this.modifyDishUseCase.modifyDish(dishId, dish);
    }
}