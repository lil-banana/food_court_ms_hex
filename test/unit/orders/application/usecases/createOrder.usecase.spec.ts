import { CreateOrderUseCase } from '../../../../../src/orders/application/usecases/createOrder.usecase';
import { Order } from '../../../../../src/orders/domain/models/order.model';
import { VALID_ORDER } from '../../mocks/order.mock';
import { DEACTIVATED_DISH, OTHER_DISH, VALID_DISH } from '../../../dishes/mocks/dish.mock';
import { Dish } from '../../../../../src/dishes/domain/models/dish.model';
import { AlreadyHasActiveOrderException } from '../../../../../src/orders/application/exceptions/alreadyHasActiveOrder.exception';
import { DishAndRestaurantDoNotMatchException } from '../../../../../src/orders/application/exceptions/dishAndRestaurantDoNotMatch.exception';
import { DishIsNotActiveException } from '../../../../../src/orders/application/exceptions/dishIsNotActive.exception';

describe('Create Order Use Case', () => {
    let createOrderUseCase: CreateOrderUseCase;
    let orderRepository: any;
    let dishRepository: any;

    beforeEach(() => {
        orderRepository = {
            saveOrder: jest.fn(),
            checkActiveOrderByClient: jest.fn()
        };
        dishRepository = {
            getDish: jest.fn()
        };
        createOrderUseCase = new CreateOrderUseCase(orderRepository, dishRepository);
    });


    describe('Success', () => {
        it('should save the order', async () => {
            const order: Order = VALID_ORDER;
            const expectedDish: Dish = VALID_DISH;
            const expectedOrderId: string = VALID_ORDER.id;

            jest.spyOn(orderRepository, 'checkActiveOrderByClient').mockResolvedValue(false);
            jest.spyOn(dishRepository, 'getDish').mockResolvedValue(expectedDish);
            jest.spyOn(orderRepository, 'saveOrder').mockResolvedValue(expectedOrderId);
            
            const result = await createOrderUseCase.saveOrder(order);
            
            expect(result).toEqual(expectedOrderId);
            expect(orderRepository.checkActiveOrderByClient).toHaveBeenCalledWith(order.clientId);
            expect(dishRepository.getDish).toHaveBeenCalledWith(order.items[0].dish.id);
            expect(orderRepository.saveOrder).toHaveBeenCalledWith(order);
        });
    });
    
    describe('Failure', () => {
        it('should throw a AlreadyHasActiveOrderException when client has an active order', async () => {
            const order: Order = VALID_ORDER;

            jest.spyOn(console, 'error').mockImplementation(() => {});
            jest.spyOn(orderRepository, 'checkActiveOrderByClient').mockResolvedValue(true);
            
            await expect(createOrderUseCase.saveOrder(order)).rejects.toThrow(AlreadyHasActiveOrderException);
            expect(orderRepository.checkActiveOrderByClient).toHaveBeenCalledWith(order.clientId);
        });

        it('should catch and throw a DishAndRestaurantDoNotMatchException when a dish from the order is not from the same restaurant', async () => {
            const order: Order = VALID_ORDER;
            const expectedDish: Dish = OTHER_DISH;

            jest.spyOn(console, 'error').mockImplementation(() => {});
            jest.spyOn(orderRepository, 'checkActiveOrderByClient').mockResolvedValue(false);
            jest.spyOn(dishRepository, 'getDish').mockResolvedValue(expectedDish);
            
            await expect(createOrderUseCase.saveOrder(order)).rejects.toThrow(DishAndRestaurantDoNotMatchException);
            expect(orderRepository.checkActiveOrderByClient).toHaveBeenCalledWith(order.clientId);
            expect(dishRepository.getDish).toHaveBeenCalledWith(order.items[0].dish.id);
        });

        it('should catch and throw a DishIsNotActiveException when a dish from the order is not active', async () => {
            const order: Order = VALID_ORDER;
            const expectedDish: Dish = DEACTIVATED_DISH;

            jest.spyOn(console, 'error').mockImplementation(() => {});
            jest.spyOn(orderRepository, 'checkActiveOrderByClient').mockResolvedValue(false);
            jest.spyOn(dishRepository, 'getDish').mockResolvedValue(expectedDish);
            
            await expect(createOrderUseCase.saveOrder(order)).rejects.toThrow(DishIsNotActiveException);
            expect(orderRepository.checkActiveOrderByClient).toHaveBeenCalledWith(order.clientId);
            expect(dishRepository.getDish).toHaveBeenCalledWith(order.items[0].dish.id);
        });
        
        it('should catch and throw an unexpected error', async () => {
            const order: Order = VALID_ORDER;

            jest.spyOn(console, 'error').mockImplementation(() => {});
            jest.spyOn(orderRepository, 'checkActiveOrderByClient').mockRejectedValue(new Error());
            
            await expect(createOrderUseCase.saveOrder(order)).rejects.toThrow(Error);
            expect(orderRepository.checkActiveOrderByClient).toHaveBeenCalledWith(order.clientId);
        });
    });
});