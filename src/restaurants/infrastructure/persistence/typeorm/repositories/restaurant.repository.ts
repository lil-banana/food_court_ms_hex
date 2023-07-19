import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantEntity } from '../entities/restaurant.entity';

@Injectable()
export class RestaurantRepository {
    constructor(
        @InjectRepository(RestaurantEntity)
        private restaurantRepository: Repository<RestaurantEntity>,
    ) { }

    save(restaurant: RestaurantEntity): Promise<RestaurantEntity> {
        return this.restaurantRepository.save(restaurant);
    }

    findOneByOwner(ownerId: string): Promise<RestaurantEntity> {
        return this.restaurantRepository.findOne({ where: { ownerId } });
    }
}