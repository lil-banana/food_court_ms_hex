import { ApiProperty } from "@nestjs/swagger";

export class OrderIdDto {
    @ApiProperty({ description: 'The unique identifier of the order, is an uuid', example: 'c84e71b4-8f2c-4355-bc2d-d0bdfd35e269' })
    id: string;
}