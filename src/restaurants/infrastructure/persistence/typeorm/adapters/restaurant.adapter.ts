import { Injectable } from '@nestjs/common';
import { RestaurantPersistencePort } from 'src/restaurants/domain/repositories/restaurant.repository';
import { RestaurantRepository } from '../repositories/restaurant.repository';
import { RestaurantEntityMapper } from '../mappers/restaurantEntity.mapper';
import { Restaurant } from 'src/restaurants/domain/models/restaurant.model';
import { RestaurantEntity } from '../entities/restaurant.entity';

@Injectable()
export class RestaurantAdapter implements RestaurantPersistencePort {
    private readonly restaurantEntityMapper: RestaurantEntityMapper = new RestaurantEntityMapper();

    constructor(
        private readonly restaurantRepository: RestaurantRepository
    ) { }

    async saveRestaurant(restaurant: Restaurant): Promise<Restaurant> {
        try {
            const restaurantEntity: RestaurantEntity = this.restaurantEntityMapper.toRestaurantEntity(restaurant);
            return this.restaurantEntityMapper.toRestaurant(await this.restaurantRepository.save(restaurantEntity));
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getRestaurantByOwner(ownerId: string): Promise<Restaurant> {
        try {
            return this.restaurantEntityMapper.toRestaurant(await this.restaurantRepository.findOneByOwner(ownerId));
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}