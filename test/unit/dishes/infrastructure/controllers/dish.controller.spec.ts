import { DishController } from '../../../../../src/dishes/infrastructure/controllers/dish.controller';
import { DishRequest } from '../../../../../src/dishes/infrastructure/controllers/dtos/dishRequest.dto';
import { DishIdDto } from '../../../../../src/dishes/infrastructure/controllers/dtos/dishIdDto.dto';
import { Dish } from '../../../../../src/dishes/domain/models/dish.model';
import { VALID_DISH, VALID_DISH_NO_ID_NO_RESTAURANT_ID_CATEGORY, VALID_DISH_PARTIAL } from '../../mocks/dish.mock';
import { VALID_DISH_REQUEST } from '../../mocks/dishRequest.mock';
import { VALID_DISH_ID_DTO } from '../../mocks/dishIdDto.mock';
import { DishUpdate } from '../../../../../src/dishes/infrastructure/controllers/dtos/dishUpdate.dto';
import { VALID_DISH_UPDATE } from '../../mocks/dishUpdate.mock';

describe('Dish Controller', () => {
    let dishController: DishController;
    let createDishUseCase: any;
    let modifyDishUseCase: any;
    let dishRequestMapper: any;
    let dishIdDtoMapper: any;
    let dishUpdateMapper: any;

    beforeEach(() => {
        createDishUseCase = {
            saveDish: jest.fn(),
        };
        modifyDishUseCase = {
            modifyDish: jest.fn(),
        };
        dishRequestMapper = {
            toDish: jest.fn(),
        };
        dishIdDtoMapper = {
            toDishIdDto: jest.fn(),
        };
        dishUpdateMapper = {
            toDishPartial: jest.fn(),
        };
        dishController = new DishController(createDishUseCase, modifyDishUseCase);
        (dishController as any).dishRequestMapper = dishRequestMapper;
        (dishController as any).dishIdDtoMapper = dishIdDtoMapper;
        (dishController as any).dishUpdateMapper = dishUpdateMapper;
    });

    describe('POST /dishes (create dish)', () => {
        describe('Success', () => {
            it('should save the dish and return a dish response', async () => {
                const request: any = { user: { userId : VALID_DISH.restaurant.id } }; 
                const dishRequest: DishRequest = VALID_DISH_REQUEST;
                const mappedDish: Dish = VALID_DISH_NO_ID_NO_RESTAURANT_ID_CATEGORY;
                const savedDish: Dish = VALID_DISH;
                const dishIdDto: DishIdDto = VALID_DISH_ID_DTO;

                jest.spyOn(dishRequestMapper, 'toDish').mockReturnValue(mappedDish);
                jest.spyOn(createDishUseCase, 'saveDish').mockResolvedValue(savedDish);
                jest.spyOn(dishIdDtoMapper, 'toDishIdDto').mockReturnValue(dishIdDto);

                const result = await dishController.saveDish(dishRequest, request);

                expect(result).toEqual(dishIdDto);
                expect(dishRequestMapper.toDish).toHaveBeenCalledWith(dishRequest);
                expect(createDishUseCase.saveDish).toHaveBeenCalledWith(mappedDish, VALID_DISH.restaurant.id);
                expect(dishIdDtoMapper.toDishIdDto).toHaveBeenCalledWith(savedDish);
            });
        });
    });
    
    describe('PATCH /dishes/:id (modifies dish)', () => {
        describe('Success', () => {
            it('should modify the dish', async () => {
                const dishUpdate: DishUpdate = VALID_DISH_UPDATE;
                const dish: Partial<Dish> = VALID_DISH_UPDATE;

                jest.spyOn(dishUpdateMapper, 'toDishPartial').mockReturnValue(dish);

                await dishController.modifyDish('id', dishUpdate);

                expect(dishUpdateMapper.toDishPartial).toHaveBeenCalledWith(dishUpdate);
                expect(modifyDishUseCase.modifyDish).toHaveBeenCalledWith('id', dish);
            });
        });
    });
});