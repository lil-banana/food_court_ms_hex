import { Inject, Injectable } from '@nestjs/common';
import { DISH_PERSISTENCE_PORT, DishPersistencePort } from '../../domain/repositories/dish.repository';
import { Dish } from '../../domain/models/dish.model';
import { IActivateDeactivateDishUseCase } from '../../domain/interfaces/activateDeactivateDish.interface';
import { OwnerDoesNotMatchException } from '../exceptions/ownerDoesNotMatch.exception';

@Injectable()
export class ActivateDeactivateDishUseCase implements IActivateDeactivateDishUseCase {
    constructor(
        @Inject(DISH_PERSISTENCE_PORT) private readonly dishRepository: DishPersistencePort
    ) { }

    async activateDish(dishId: string, ownerId: string): Promise<void> {
        try {
            const savedDish = await this.dishRepository.getDish(dishId);
            if (savedDish.restaurant.ownerId !== ownerId) {
                throw new OwnerDoesNotMatchException()
            }
            savedDish.active = true;
            await this.dishRepository.saveDish(savedDish);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async deactivateDish(dishId: string, ownerId: string): Promise<void> {
        try {
            const savedDish = await this.dishRepository.getDish(dishId);
            if (savedDish.restaurant.ownerId !== ownerId) {
                throw new OwnerDoesNotMatchException()
            }
            savedDish.active = false;
            await this.dishRepository.saveDish(savedDish);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}