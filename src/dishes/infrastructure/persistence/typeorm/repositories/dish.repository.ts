import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DishEntity } from '../entities/dish.entity';

@Injectable()
export class DishRepository {
    constructor(
        @InjectRepository(DishEntity)
        private dishRepository: Repository<DishEntity>,
    ) { }

    save(dish: DishEntity): Promise<DishEntity> {
        return this.dishRepository.save(dish);
    }

    findOneById(id: string): Promise<DishEntity> {
        return this.dishRepository.findOneBy({ id });
    }
}