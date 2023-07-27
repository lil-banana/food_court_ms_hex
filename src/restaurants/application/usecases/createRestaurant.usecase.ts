import { Inject, Injectable } from '@nestjs/common';
import { RESTAURANT_PERSISTENCE_PORT, RestaurantPersistencePort } from '../../domain/repositories/restaurant.repository';
import { ICreateRestaurantUseCase } from '../../domain/interfaces/createRestaurant.interface';
import { Restaurant } from '../../../restaurants/domain/models/restaurant.model';
import { USERS_SERVICE_PORT, UsersServicePort } from '../../domain/services/user.service';
import { UserIsNotOwnerException } from '../exceptions/userIsNotOwner.exception';

@Injectable()
export class CreateRestaurantUseCase implements ICreateRestaurantUseCase {
    constructor(
        @Inject(RESTAURANT_PERSISTENCE_PORT) private readonly restaurantRepository: RestaurantPersistencePort,
        @Inject(USERS_SERVICE_PORT) private readonly usersService: UsersServicePort,
    ) { }

    async saveRestaurant(restaurant: Restaurant): Promise<Restaurant> {
        try {
            if (await this.usersService.checkOwnerUser(restaurant.ownerId)) {
                return this.restaurantRepository.saveRestaurant(restaurant);
            } else {
                throw new UserIsNotOwnerException('The userId given does not belong to an owner');
            }
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}