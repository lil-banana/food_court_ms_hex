import { In, Not } from 'typeorm';
import { OrderEntity } from '../../../../../../../src/orders/infrastructure/persistence/typeorm/entities/order.entity';
import { OrderRepository } from '../../../../../../../src/orders/infrastructure/persistence/typeorm/repositories/order.repository';
import { VALID_ORDER_ENTITY, VALID_ORDER_ENTITY_NO_ID } from '../../../../mocks/orderEntity.mock';

describe('Order Repository', () => {
    let orderRepository: OrderRepository;
    let entityRepository: any;

    beforeEach(() => {
        entityRepository = {
            save: jest.fn(),
            find: jest.fn()
        };
        orderRepository = new OrderRepository(entityRepository);
    });

    describe('Success', () => {
        describe('save', () => {
            it('should save the order', async () => {
                const orderEntity: OrderEntity = VALID_ORDER_ENTITY_NO_ID;
                const expectedOrderEntity: OrderEntity = VALID_ORDER_ENTITY;

                jest.spyOn(entityRepository, 'save').mockResolvedValue(expectedOrderEntity);
    
                const result = await orderRepository.save(orderEntity);
    
                expect(result).toBe(expectedOrderEntity);
                expect(entityRepository.save).toHaveBeenCalledWith(orderEntity);
            });
        });
        
        describe('getActiveOrderByClient', () => {
            it('should get the active orders of a client', async () => {
                const expectedOrderEntityList: OrderEntity[] = [ VALID_ORDER_ENTITY ];

                jest.spyOn(entityRepository, 'find').mockResolvedValue(expectedOrderEntityList);

                const result = await orderRepository.getActiveOrderByClient('id');

                expect(result).toBe(expectedOrderEntityList);
                expect(entityRepository.find).toHaveBeenCalledWith({ where: { clientId: 'id', status: Not(In([ 'cancelled', 'delivered' ])) } });
            });
        });
        
        describe('findAll', () => {
            it('should get the orders for a restaurant with given owner id and filtered with an status', async () => {
                const expectedOrderEntityList: OrderEntity[] = [ VALID_ORDER_ENTITY ];

                jest.spyOn(entityRepository, 'find').mockResolvedValue(expectedOrderEntityList);

                const result = await orderRepository.findAll('ownerId', 'pending', 1, 2);

                expect(result).toBe(expectedOrderEntityList);
                expect(entityRepository.find).toHaveBeenCalledWith({ skip: 1, take: 2, where: { restaurant: { ownerId: 'ownerId'}, status: 'pending' } });
            });
        });
    });
});