import { DishController } from '../../../../../src/dishes/infrastructure/controllers/dish.controller';
import { DishRequest } from '../../../../../src/dishes/infrastructure/controllers/dtos/dishRequest.dto';
import { DishIdDto } from '../../../../../src/dishes/infrastructure/controllers/dtos/dishIdDto.dto';
import { Dish } from '../../../../../src/dishes/domain/models/dish.model';
import { VALID_DISH, VALID_DISH_NO_ID, VALID_DISH_NO_ID_NO_RESTAURANT_ID_CATEGORY } from '../../mocks/dish.mock';
import { VALID_DISH_REQUEST } from '../../mocks/dishRequest.mock';
import { VALID_DISH_ID_DTO } from '../../mocks/dishIdDto.mock';

describe('Dish Controller', () => {
    let dishController: DishController;
    let createDishUseCase: any;
    let dishRequestMapper: any;
    let dishIdDtoMapper: any;

    beforeEach(() => {
        createDishUseCase = {
            saveDish: jest.fn(),
        };
        dishRequestMapper = {
            toDish: jest.fn(),
        };
        dishIdDtoMapper = {
            toDishIdDto: jest.fn(),
        };
        dishController = new DishController(createDishUseCase);
        (dishController as any).dishRequestMapper = dishRequestMapper;
        (dishController as any).dishIdDtoMapper = dishIdDtoMapper;
    });

    describe('POST /dishes (create dish)', () => {
        describe('Success', () => {
            it('should save the dish and return a dish response', async () => {
                const dishRequest: DishRequest = VALID_DISH_REQUEST;
                const mappedDish: Dish = VALID_DISH_NO_ID_NO_RESTAURANT_ID_CATEGORY;
                const savedDish: Dish = VALID_DISH;
                const dishIdDto: DishIdDto = VALID_DISH_ID_DTO;

                jest.spyOn(dishRequestMapper, 'toDish').mockReturnValue(mappedDish);
                jest.spyOn(createDishUseCase, 'saveDish').mockResolvedValue(savedDish);
                jest.spyOn(dishIdDtoMapper, 'toDishIdDto').mockReturnValue(dishIdDto);

                const result = await dishController.saveDish(dishRequest);

                expect(result).toEqual(dishIdDto);
                expect(dishRequestMapper.toDish).toHaveBeenCalledWith(dishRequest);
                expect(createDishUseCase.saveDish).toHaveBeenCalledWith(mappedDish, 'eb2c393d-b54c-435b-aea7-eb49317c3a6b');
                expect(dishIdDtoMapper.toDishIdDto).toHaveBeenCalledWith(savedDish);
            });
        });
    });
});