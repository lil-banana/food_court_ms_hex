import { Inject, Injectable } from '@nestjs/common';
import { DISH_PERSISTENCE_PORT, DishPersistencePort } from '../../domain/repositories/dish.repository';
import { Dish } from '../../domain/models/dish.model';
import { IModifyDishUseCase } from '../../domain/interfaces/modifyDish.interface';

@Injectable()
export class ModifyDishUseCase implements IModifyDishUseCase {
    constructor(
        @Inject(DISH_PERSISTENCE_PORT) private readonly dishRepository: DishPersistencePort
    ) { }

    async modifyDish(dishId: string, dishUpdate: Partial<Dish>): Promise<void> {
        try {
            const savedDish = await this.dishRepository.getDish(dishId);
            savedDish.description = dishUpdate.description ?? savedDish.description;
            savedDish.price = dishUpdate.price ?? savedDish.price;
            await this.dishRepository.saveDish(savedDish);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}