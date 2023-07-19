import { Dish } from '../../../../../../src/dishes/domain/models/dish.model';
import { DishIdDto } from '../../../../../../src/dishes/infrastructure/controllers/dtos/dishIdDto.dto';
import { DishIdDtoMapper } from '../../../../../../src/dishes/infrastructure/controllers/mappers/dishIdDto.mapper';
import { VALID_DISH_ID_DTO } from '../../../mocks/dishIdDto.mock';
import { VALID_DISH } from '../../../mocks/dish.mock';

describe('Dish Response Mapper', () => {
    let dishResponseMapper: DishIdDtoMapper;

    beforeEach(() => {
        dishResponseMapper = new DishIdDtoMapper();
    });

    describe('Success', () => {
        describe('toDishResponse', () => {
            it('should map Dish to DishIdDto', () => {
                const dish: Dish = VALID_DISH;
                const expectedDishIdDto: DishIdDto = VALID_DISH_ID_DTO;
    
                const dishResponse = dishResponseMapper.toDishIdDto(dish);
    
                expect(dishResponse).toEqual(expectedDishIdDto);
            });
        });
    });
});