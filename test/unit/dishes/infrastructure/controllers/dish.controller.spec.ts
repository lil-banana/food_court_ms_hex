import { DishController } from '../../../../../src/dishes/infrastructure/controllers/dish.controller';
import { DishRequest } from '../../../../../src/dishes/infrastructure/controllers/dtos/dishRequest.dto';
import { DishIdDto } from '../../../../../src/dishes/infrastructure/controllers/dtos/dishIdDto.dto';
import { Dish } from '../../../../../src/dishes/domain/models/dish.model';
import { VALID_DISH, VALID_DISH_NO_ID_NO_RESTAURANT_ID_CATEGORY } from '../../mocks/dish.mock';
import { VALID_DISH_REQUEST } from '../../mocks/dishRequest.mock';
import { VALID_DISH_ID_DTO } from '../../mocks/dishIdDto.mock';
import { DishUpdate } from '../../../../../src/dishes/infrastructure/controllers/dtos/dishUpdate.dto';
import { VALID_DISH_UPDATE } from '../../mocks/dishUpdate.mock';
import { QUERY_OPTIONS } from '../../mocks/queryOptionsDto.mock';
import { QueryOptionsDto } from 'src/dishes/infrastructure/controllers/dtos/queryOptions.dto';
import { VALID_DISH_RESPONSE } from '../../mocks/dishResponse.mock';
import { DishResponse } from '../../../../../src/dishes/infrastructure/controllers/dtos/dishResponse.dto';

describe('Dish Controller', () => {
    let dishController: DishController;
    let createDishUseCase: any;
    let modifyDishUseCase: any;
    let activateDeactivateDishUseCase: any;
    let getDishesUseCase: any;
    let dishRequestMapper: any;
    let dishIdDtoMapper: any;
    let dishUpdateMapper: any;
    let dishResponseMapper: any;
    let queryOptionsDtoMapper: any;

    beforeEach(() => {
        createDishUseCase = {
            saveDish: jest.fn(),
        };
        modifyDishUseCase = {
            modifyDish: jest.fn(),
        };
        activateDeactivateDishUseCase = {
            activateDish: jest.fn(),
            deactivateDish: jest.fn()
        };
        getDishesUseCase = {
            getDishes: jest.fn()
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
        dishResponseMapper = {
            toDishResponseList: jest.fn(),
        };
        queryOptionsDtoMapper = {
            toQueryOptions: jest.fn(),
        };
        dishController = new DishController(createDishUseCase, modifyDishUseCase, activateDeactivateDishUseCase, getDishesUseCase);
        (dishController as any).dishRequestMapper = dishRequestMapper;
        (dishController as any).dishIdDtoMapper = dishIdDtoMapper;
        (dishController as any).dishUpdateMapper = dishUpdateMapper;
        (dishController as any).dishResponseMapper = dishResponseMapper;
        (dishController as any).queryOptionsDtoMapper = queryOptionsDtoMapper;
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
    
    describe('PATCH /dishes/activate/:id (activates dish)', () => {
        describe('Success', () => {
            it('should activate the dish', async () => {
                const request: any = { user: { userId : 'userid' } };

                await dishController.activateDish('id', request);

                expect(activateDeactivateDishUseCase.activateDish).toHaveBeenCalledWith('id', 'userid');
            });
        });
    });
    
    describe('PATCH /dishes/deactivate/:id (deactivates dish)', () => {
        describe('Success', () => {
            it('should deactivate the dish', async () => {
                const request: any = { user: { userId : 'userid' } };

                await dishController.deactivateDish('id', request);

                expect(activateDeactivateDishUseCase.deactivateDish).toHaveBeenCalledWith('id', 'userid');
            });
        });
    });
    
    describe('GET /dishes/restaurant/:id (get dishes of a restaurant)', () => {
        describe('Success', () => {
            it('should get dishes', async () => {
                const queryOptions: QueryOptionsDto = QUERY_OPTIONS;
                const expectedDishResponse: DishResponse = VALID_DISH_RESPONSE;
    
                jest.spyOn(queryOptionsDtoMapper, 'toQueryOptions').mockReturnValue({ ... queryOptions });
                jest.spyOn(getDishesUseCase, 'getDishes').mockResolvedValue([ VALID_DISH ]);
                jest.spyOn(dishResponseMapper, 'toDishResponseList').mockReturnValue([ expectedDishResponse ]);

                const result = await dishController.getDishes('id', queryOptions);

                expect(result).toEqual([ expectedDishResponse ]);
                expect(queryOptionsDtoMapper.toQueryOptions).toHaveBeenCalledWith(queryOptions);
                expect(getDishesUseCase.getDishes).toHaveBeenCalledWith('id', queryOptions.page, queryOptions.limit, queryOptions.category);
                expect(dishResponseMapper.toDishResponseList).toHaveBeenCalledWith([ VALID_DISH ]);
            });
        });
    });
});