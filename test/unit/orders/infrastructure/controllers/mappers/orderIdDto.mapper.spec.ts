import { OrderIdDto } from '../../../../../../src/orders/infrastructure/controllers/dtos/orderIdDto.dto';
import { OrderIdDtoMapper } from '../../../../../../src/orders/infrastructure/controllers/mappers/orderIdDto.mapper';
import { VALID_ORDER_ID_DTO } from '../../../mocks/orderIdDto.mock';
import { VALID_ORDER } from '../../../mocks/order.mock';

describe('Order Id Dto Mapper', () => {
    let orderIdDtoMapper: OrderIdDtoMapper;

    beforeEach(() => {
        orderIdDtoMapper = new OrderIdDtoMapper();
    });

    describe('Success', () => {
        describe('toOrderIdDto', () => {
            it('should map orderId to OrderIdDto', () => {
                const orderId: string = VALID_ORDER.id;
                const expectedOrderIdDto: OrderIdDto = VALID_ORDER_ID_DTO;
    
                const orderIdDto = orderIdDtoMapper.toOrderIdDto(orderId);

                expect(orderIdDto).toEqual(expectedOrderIdDto);
            });
        });
    });
});