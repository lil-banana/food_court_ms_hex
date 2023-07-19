import { RestaurantEntity } from '../../../../src/restaurants/infrastructure/persistence/typeorm/entities/restaurant.entity';
import { VALID_RESTAURANT } from './restaurant.mock';

export const VALID_RESTAURANT_ENTITY: RestaurantEntity = {
    id: VALID_RESTAURANT.id,
    name: VALID_RESTAURANT.name,
    nit: VALID_RESTAURANT.nit,
    address: VALID_RESTAURANT.address,
    telephoneNumber: VALID_RESTAURANT.telephoneNumber,
    logoUrl: VALID_RESTAURANT.logoUrl,
    ownerId: VALID_RESTAURANT.ownerId,
    createdAt: undefined,
    updatedAt: undefined
}

export const VALID_RESTAURANT_ENTITY_NO_ID: RestaurantEntity = {
    id: undefined,
    name: VALID_RESTAURANT.name,
    nit: VALID_RESTAURANT.nit,
    address: VALID_RESTAURANT.address,
    telephoneNumber: VALID_RESTAURANT.telephoneNumber,
    logoUrl: VALID_RESTAURANT.logoUrl,
    ownerId: VALID_RESTAURANT.ownerId,
    createdAt: undefined,
    updatedAt: undefined
}