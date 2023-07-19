import { CreateRestaurantUseCase } from '../../../../../src/restaurants/application/usecases/createRestaurant.usecase';
import { Restaurant } from '../../../../../src/restaurants/domain/models/restaurant.model';
import { UserIsNotOwnerException } from '../../../../../src/restaurants/application/exceptions/userIsNotOwner.exception';
import { VALID_RESTAURANT, VALID_RESTAURANT_NO_ID } from '../../mocks/restaurant.mock';

describe('Create Restaurant Use Case', () => {
    let restaurantRepository: any;
    let usersService: any;
    let createRestaurantUseCase: CreateRestaurantUseCase;

    beforeEach(() => {
        restaurantRepository = {
            saveRestaurant: jest.fn()
        };
        usersService = {
            checkOwnerUser: jest.fn(),
        };
        createRestaurantUseCase = new CreateRestaurantUseCase(restaurantRepository, usersService);
    });


    describe('Success', () => {
        it('should save the restaurant', async () => {
            const restaurant: Restaurant = VALID_RESTAURANT_NO_ID;
            const expectedRestaurant: Restaurant = VALID_RESTAURANT;

            jest.spyOn(usersService, 'checkOwnerUser').mockResolvedValue(true);
            jest.spyOn(restaurantRepository, 'saveRestaurant').mockResolvedValue(expectedRestaurant);
            
            const result = await createRestaurantUseCase.saveRestaurant(restaurant);
            
            expect(result).toEqual(expectedRestaurant);
            expect(usersService.checkOwnerUser).toHaveBeenCalledWith(restaurant.ownerId);
            expect(restaurantRepository.saveRestaurant).toHaveBeenCalledWith(restaurant);
        });
    });
    
    describe('Failure', () => {
        it('should throw UserIsNotOwnerException if the user is not an owner', async () => {
            const restaurant: Restaurant = VALID_RESTAURANT_NO_ID;

            jest.spyOn(console, 'error').mockImplementation(() => {});
            jest.spyOn(usersService, 'checkOwnerUser').mockResolvedValue(false);
    
            await expect(createRestaurantUseCase.saveRestaurant(restaurant)).rejects.toThrow(UserIsNotOwnerException);
            expect(usersService.checkOwnerUser).toHaveBeenCalledWith(restaurant.ownerId);
            expect(restaurantRepository.saveRestaurant).not.toHaveBeenCalled();
        });

        it('should catch and throw an unexpected error', async () => {
            const restaurant: Restaurant = VALID_RESTAURANT_NO_ID;

            jest.spyOn(console, 'error').mockImplementation(() => {});
            jest.spyOn(usersService, 'checkOwnerUser').mockResolvedValue(true);
            jest.spyOn(restaurantRepository, 'saveRestaurant').mockRejectedValue(new Error());
    
            await expect(createRestaurantUseCase.saveRestaurant(restaurant)).rejects.toThrow(Error);
            expect(usersService.checkOwnerUser).toHaveBeenCalledWith(restaurant.ownerId);
            expect(restaurantRepository.saveRestaurant).toHaveBeenCalledWith(restaurant);
        });
    });
});