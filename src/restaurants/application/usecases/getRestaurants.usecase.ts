import { Inject, Injectable } from '@nestjs/common';
import { RESTAURANT_PERSISTENCE_PORT, RestaurantPersistencePort } from '../../domain/repositories/restaurant.repository';
import { Restaurant } from '../../domain/models/restaurant.model';
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