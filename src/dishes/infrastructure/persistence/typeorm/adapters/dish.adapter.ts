import { Injectable } from '@nestjs/common';
import { DishPersistencePort } from '../../../../domain/repositories/dish.repository';
import { DishEntityMapper } from '../mappers/dishEntity.mapper';
import { DishRepository } from '../repositories/dish.repository';
import { Dish } from '../../../../domain/models/dish.model';
import { DishEntity } from '../entities/dish.entity';
import { DishNotFoundException } from '../../../exceptions/dishNotFound.exception';

@Injectable()
export class DishAdapter implements DishPersistencePort {
    private readonly dishEntityMapper: DishEntityMapper = new DishEntityMapper();

    constructor(
        private readonly dishRepository: DishRepository
    ) { }

    async saveDish(dish: Dish): Promise<Dish> {
        try {
            const dishEntity: DishEntity = this.dishEntityMapper.toDishEntity(dish);
            return this.dishEntityMapper.toDish(await this.dishRepository.save(dishEntity));
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getDish(dishId: string): Promise<Dish> {
        const dishEntity: DishEntity = await this.dishRepository.findOneById(dishId);
        if (!dishEntity) {
            throw new DishNotFoundException('Dish with given id does not exist');
        }
        return this.dishEntityMapper.toDish(dishEntity);
    }
}