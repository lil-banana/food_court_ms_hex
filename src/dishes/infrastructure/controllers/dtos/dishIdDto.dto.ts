import { ApiProperty } from "@nestjs/swagger";

export class DishIdDto {
    @ApiProperty({ description: 'The unique identifier of the dish, is an uuid', example: 'c84e71b4-8f2c-4355-bc2d-d0bdfd35e269' })
    id: string;
}