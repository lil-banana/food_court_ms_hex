import { Inject, Injectable } from '@nestjs/common';
import { RESTAURANT_PERSISTENCE_PORT, RestaurantPersistencePort } from '../../domain/repositories/restaurant.repository';
import { Restaurant } from 'src/restaurants/domain/models/restaurant.model';
import { USERS_SERVICE_PORT, UsersServicePort } from '../../domain/services/user.service';
import { UserIsNotOwnerException } from '../exceptions/userIsNotOwner.exception';
import { IGetRestaurantsUseCase } from '../../domain/interfaces/getRestaurants.interface';

@Injectable()
export class GetRestaurantsUseCase implements IGetRestaurantsUseCase {
    constructor(
        @Inject(RESTAURANT_PERSISTENCE_PORT) private readonly restaurantRepository: RestaurantPersistencePort
    ) { }

    async getRestaurants(page: number, limit: number): Promise<Restaurant[]> {
        try {
            return this.restaurantRepository.getRestaurants(page, limit);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}