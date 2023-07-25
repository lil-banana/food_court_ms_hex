import { ModifyDishUseCase } from '../../../../../src/dishes/application/usecases/modifyDish.usecase';
import { Dish } from '../../../../../src/dishes/domain/models/dish.model';
import { VALID_DISH, VALID_DISH_PARTIAL, VALID_DISH_UPDATED, VALID_DISH_PARTIAL_VOID } from '../../mocks/dish.mock';
import { DishNotFoundException } from '../../../../../src/dishes/infrastructure/exceptions/dishNotFound.exception';

describe('Modify Dish Use Case', () => {
    let dishRepository: any;
    let restaurantRepository: any;
    let modifyDishUseCase: ModifyDishUseCase;

    beforeEach(() => {
        dishRepository = {
            saveDish: jest.fn(),
            getDish: jest.fn()
        };
        restaurantRepository = {
            getRestaurantByOwner: jest.fn(),
        };
        modifyDishUseCase = new ModifyDishUseCase(dishRepository);
    });


    describe('Success', () => {
        it('should update the dish', async () => {
            const dishUpdate: Partial<Dish> = VALID_DISH_PARTIAL;
            const savedDish: Dish = VALID_DISH;
            const expectedDish: Dish = VALID_DISH_UPDATED;

            jest.spyOn(dishRepository, 'getDish').mockResolvedValue(savedDish);
            
            await modifyDishUseCase.modifyDish(savedDish.id, dishUpdate);
            
            expect(dishRepository.getDish).toHaveBeenCalledWith(savedDish.id);
            expect(dishRepository.saveDish).toHaveBeenCalledWith(expectedDish);
        });

        it('should not update the dish', async () => {
            const dishUpdate: Partial<Dish> = VALID_DISH_PARTIAL_VOID;
            const expectedDish: Dish = VALID_DISH;

            jest.spyOn(dishRepository, 'getDish').mockResolvedValue(expectedDish);
            
            await modifyDishUseCase.modifyDish(expectedDish.id, dishUpdate);
            
            expect(dishRepository.getDish).toHaveBeenCalledWith(expectedDish.id);
            expect(dishRepository.saveDish).toHaveBeenCalledWith(expectedDish);
        });
    });
    
    describe('Failure', () => {
        it('should catch and throw an unexpected error', async () => {
            const dishUpdate: Partial<Dish> = VALID_DISH_PARTIAL;

            jest.spyOn(console, 'error').mockImplementation(() => {});
            jest.spyOn(dishRepository, 'getDish').mockRejectedValue(new DishNotFoundException());
    
            await expect(modifyDishUseCase.modifyDish('id', dishUpdate)).rejects.toThrow(DishNotFoundException);
            expect(dishRepository.getDish).toHaveBeenCalledWith('id');
        });
    });
});