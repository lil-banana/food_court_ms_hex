import { IsUUID, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DishQuantityDto } from './dishQuantity.dto';

export class OrderRequest {
  @ApiProperty({ description: 'The unique identifier of the restaurant, is an uuid', example: '421d5e2e-c168-493d-9846-88c5914e5eb1' })
  @IsUUID()
  restaurantId: string;

  @ApiProperty({ 
    type: DishQuantityDto,
    isArray: true,
    description: 'A list of dishes with quantities',
    example: [{ dishId: '4936d4bb-ce54-41e9-bde8-ce9a803cb00a', quantity: 2 }, { dishId: 'b3876915-21a5-48ba-bdc6-e020caeb3f31', quantity: 1 }]
  })
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */() => DishQuantityDto)
  dishes: DishQuantityDto[];
}