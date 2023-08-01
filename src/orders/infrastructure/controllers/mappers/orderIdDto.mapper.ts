import { OrderIdDto } from '../dtos/orderIdDto.dto';

export class OrderIdDtoMapper {
    toOrderIdDto(orderId: string): OrderIdDto {
        const orderIdDto: OrderIdDto = new OrderIdDto();
        orderIdDto.id = orderId;
        return orderIdDto;
    }
}