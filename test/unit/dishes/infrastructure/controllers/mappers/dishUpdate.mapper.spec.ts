import { Dish } from '../../../../../../src/dishes/domain/models/dish.model';
import { DishUpdate } from '../../../../../../src/dishes/infrastructure/controllers/dtos/dishUpdate.dto';
import { DishUpdateMapper } from '../../../../../../src/dishes/infrastructure/controllers/mappers/dishUpdate.mapper';
import { VALID_DISH_UPDATE } from '../../../mocks/dishUpdate.mock';
import { VALID_DISH_PARTIAL } from '../../../mocks/dish.mock';

describe('Dish Update Mapper', () => {
    let dishUpdateMapper: DishUpdateMapper;

    beforeEach(() => {
        dishUpdateMapper = new DishUpdateMapper();
    });

    describe('Success', () => {
        describe('toDishPartial', () => {
            it('should map DishUpdate to DishPartial', () => {
                const dishUpdate: DishUpdate = VALID_DISH_UPDATE;
                const expectedDish: Partial<Dish> = VALID_DISH_PARTIAL;
    
                const dish = dishUpdateMapper.toDishPartial(dishUpdate);
    
                expect(dish).toEqual(expectedDish);
            });
        });
    });
});