import { Restaurant } from '../../../../../src/restaurants/domain/models/restaurant.model';
import { CreateDishUseCase } from '../../../../../src/dishes/application/usecases/createDish.usecase';
import { Dish } from '../../../../../src/dishes/domain/models/dish.model';
import { VALID_DISH, VALID_DISH_NO_ID, VALID_DISH_NO_ID_NO_RESTAURANT } from '../../mocks/dish.mock';
import { VALID_RESTAURANT } from '../../../restaurants/mocks/restaurant.mock';

describe('Create Dish Use Case', () => {
    let dishRepository: any;
    let restaurantRepository: any;
    let createDishUseCase: CreateDishUseCase;

    beforeEach(() => {
        dishRepository = {
            saveDish: jest.fn()
        };
        restaurantRepository = {
            getRestaurantByOwner: jest.fn(),
        };
        createDishUseCase = new CreateDishUseCase(dishRepository, restaurantRepository);
    });


    describe('Success', () => {
        it('should save the dish', async () => {
            const dish: Dish = VALID_DISH_NO_ID_NO_RESTAURANT;
            const restaurant: Restaurant = VALID_RESTAURANT;
            const modifiedDish: Dish = VALID_DISH_NO_ID;
            const expectedDish: Dish = VALID_DISH;

            jest.spyOn(restaurantRepository, 'getRestaurantByOwner').mockResolvedValue(restaurant);
            jest.spyOn(dishRepository, 'saveDish').mockResolvedValue(expectedDish);
            
            const result = await createDishUseCase.saveDish(dish, restaurant.ownerId);
            
            expect(result).toEqual(expectedDish);
            expect(restaurantRepository.getRestaurantByOwner).toHaveBeenCalledWith(restaurant.ownerId);
            expect(dishRepository.saveDish).toHaveBeenCalledWith(modifiedDish);
        });
    });
    
    describe('Failure', () => {
        it('should catch and throw an unexpected error', async () => {
            const dish: Dish = VALID_DISH_NO_ID_NO_RESTAURANT;

            jest.spyOn(console, 'error').mockImplementation(() => {});
            jest.spyOn(restaurantRepository, 'getRestaurantByOwner').mockRejectedValue(new Error());
    
            await expect(createDishUseCase.saveDish(dish, 'id')).rejects.toThrow(Error);
            expect(restaurantRepository.getRestaurantByOwner).toHaveBeenCalledWith('id');
        });
    });
});