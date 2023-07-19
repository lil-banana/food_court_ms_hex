import { Dish } from '../../../../../../src/dishes/domain/models/dish.model';
import { DishRequest } from '../../../../../../src/dishes/infrastructure/controllers/dtos/dishRequest.dto';
import { DishRequestMapper } from '../../../../../../src/dishes/infrastructure/controllers/mappers/dishRequest.mapper';
import { VALID_DISH_REQUEST } from '../../../mocks/dishRequest.mock';
import { VALID_DISH_NO_ID_NO_RESTAURANT_ID_CATEGORY } from '../../../mocks/dish.mock';

describe('Dish Request Mapper', () => {
    let dishRequestMapper: DishRequestMapper;

    beforeEach(() => {
        dishRequestMapper = new DishRequestMapper();
    });

    describe('Success', () => {
        describe('toDish', () => {
            it('should map DishRequest to Dish', () => {
                const dishRequest: DishRequest = VALID_DISH_REQUEST;
                const expectedDish: Dish = VALID_DISH_NO_ID_NO_RESTAURANT_ID_CATEGORY;
    
                const dish = dishRequestMapper.toDish(dishRequest);
    
                expect(dish).toEqual(expectedDish);
            });
        });
    });
});