import { Dish } from '../../../../../../src/dishes/domain/models/dish.model';
import { DishResponse } from '../../../../../../src/dishes/infrastructure/controllers/dtos/dishResponse.dto';
import { DishResponseMapper } from '../../../../../../src/dishes/infrastructure/controllers/mappers/dishReponse.mapper';
import { VALID_DISH_RESPONSE } from '../../../mocks/dishResponse.mock';
import { VALID_DISH } from '../../../mocks/dish.mock';

describe('Dish Response Mapper', () => {
    let dishResponseMapper: DishResponseMapper;

    beforeEach(() => {
        dishResponseMapper = new DishResponseMapper();
    });

    describe('Success', () => {
        describe('toDishResponse', () => {
            it('should map Dish to DishResponse', () => {
                const dish: Dish = VALID_DISH;
                const expectedDishResponse: DishResponse = VALID_DISH_RESPONSE;
    
                const dishResponse = dishResponseMapper.toDishResponse(dish);
    
                expect(dishResponse).toEqual(expectedDishResponse);
            });
        });

        describe('toDishResponseList', () => {
            it('should map DishList DishResponseList', () => {
                const dishList: Dish[] = [ VALID_DISH ];
                const expectedDishResponseList: DishResponse[] = [ VALID_DISH_RESPONSE ];
    
                const dishResponse = dishResponseMapper.toDishResponseList(dishList);
    
                expect(dishResponse).toEqual(expectedDishResponseList);
            });
        });
    });
});