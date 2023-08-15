import { OrderAdapter } from '../../../../../../../src/orders/infrastructure/persistence/typeorm/adapters/order.adapter';
import { Order } from '../../../../../../../src/orders/domain/models/order.model';
import { OrderEntity } from '../../../../../../../src/orders/infrastructure/persistence/typeorm/entities/order.entity';
import { VALID_ORDER, VALID_ORDER_NO_ID } from '../../../../mocks/order.mock';
import { VALID_ORDER_ENTITY, VALID_ORDER_ENTITY_NO_ID } from '../../../../mocks/orderEntity.mock';

describe('Order Adapter', () => {
    let orderAdapter: OrderAdapter;
    let orderRepository: any;
    let orderEntityMapper: any;

    beforeEach(() => {
        orderRepository = {
            save: jest.fn(),
            getActiveOrderByClient: jest.fn(),
            findAll: jest.fn()
        };
        orderEntityMapper = {
            toOrderEntity: jest.fn(),
            toOrderList: jest.fn()
        };
        orderAdapter = new OrderAdapter(orderRepository);
        (orderAdapter as any).orderEntityMapper = orderEntityMapper;
    });

    describe('saveOrder', () => {
        describe('Success', () => {
            it('should save a new order', async () => {
                const order: Order = VALID_ORDER_NO_ID;
                const orderEntity: OrderEntity = VALID_ORDER_ENTITY_NO_ID;
                const expectedOrderEntity: OrderEntity = VALID_ORDER_ENTITY;
                const expectedOrderId: string = VALID_ORDER.id;

                jest.spyOn(orderEntityMapper, 'toOrderEntity').mockReturnValue(orderEntity);
                jest.spyOn(orderRepository, 'save').mockResolvedValue(expectedOrderEntity);

                const result = await orderAdapter.saveOrder(order);

                expect(result).toEqual(expectedOrderId);
                expect(orderEntityMapper.toOrderEntity).toHaveBeenCalledWith(order);
                expect(orderRepository.save).toHaveBeenCalledWith(orderEntity);
            });
        });

        describe('Failure', () => {
            it('should throw an unexpected error', async () => {
                const order: Order = VALID_ORDER_NO_ID;
                const orderEntity: OrderEntity = VALID_ORDER_ENTITY_NO_ID;

                jest.spyOn(console, 'error').mockImplementation(() => { });
                jest.spyOn(orderEntityMapper, 'toOrderEntity').mockReturnValue(orderEntity);
                jest.spyOn(orderRepository, 'save').mockRejectedValue(new Error());

                await expect(orderAdapter.saveOrder(order)).rejects.toThrow(Error);
                expect(orderEntityMapper.toOrderEntity).toHaveBeenCalledWith(order);
            });
        });
    });
    
    describe('checkActiveOrderByClient', () => {
        describe('Success', () => {
            it('should return true if an active order is found', async () => {
                const expectedOrderEntity: OrderEntity = VALID_ORDER_ENTITY;

                jest.spyOn(orderRepository, 'getActiveOrderByClient').mockResolvedValue([ expectedOrderEntity ]);

                const result = await orderAdapter.checkActiveOrderByClient(expectedOrderEntity.clientId);

                expect(result).toEqual(true);
                expect(orderRepository.getActiveOrderByClient).toHaveBeenCalledWith(expectedOrderEntity.clientId);
            });

            it('should return false if no active order is found', async () => {
                jest.spyOn(orderRepository, 'getActiveOrderByClient').mockResolvedValue([]);

                const result = await orderAdapter.checkActiveOrderByClient('id');

                expect(result).toEqual(false);
                expect(orderRepository.getActiveOrderByClient).toHaveBeenCalledWith('id');
            });
        });

        describe('Failure', () => {
            it('should throw an unexpected error', async () => {
                jest.spyOn(console, 'error').mockImplementation(() => { });
                jest.spyOn(orderRepository, 'getActiveOrderByClient').mockRejectedValue(new Error());

                await expect(orderAdapter.checkActiveOrderByClient('id')).rejects.toThrow(Error);
            });
        });
    });
    
    describe('getOrders', () => {
        describe('Success', () => {
            it('should return orders', async () => {
                const expectedOrderEntityList: OrderEntity[] = [VALID_ORDER_ENTITY];
                const expectedOrderList: Order[] = [VALID_ORDER];

                jest.spyOn(orderRepository, 'findAll').mockResolvedValue(expectedOrderEntityList);
                jest.spyOn(orderEntityMapper, 'toOrderList').mockReturnValue(expectedOrderList);
                
                const result = await orderAdapter.getOrders('ownerId', 'pending', 1, 10);

                expect(result).toEqual(expectedOrderList);
                expect(orderRepository.findAll).toHaveBeenCalledWith('ownerId', 'pending', 0, 10);
                expect(orderEntityMapper.toOrderList).toHaveBeenCalledWith(expectedOrderEntityList);
            });
        });

        describe('Failure', () => {
            it('should throw an unexpected error', async () => {
                jest.spyOn(console, 'error').mockImplementation(() => { });
                jest.spyOn(orderRepository, 'findAll').mockRejectedValue(new Error());

                await expect(orderAdapter.getOrders('ownerId', 'pending', 1, 10)).rejects.toThrow(Error);
            });
        });
    });
});
