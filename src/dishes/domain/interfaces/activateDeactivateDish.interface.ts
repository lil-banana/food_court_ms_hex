export const ACTIVATE_DEACTIVATE_DISH_USE_CASE = 'ACTIVATE_DEACTIVATE_DISH_USE_CASE';

export interface IActivateDeactivateDishUseCase {
    activateDish(dishId: string, ownerId: string): Promise<void>;
    deactivateDish(dishId: string, ownerId: string): Promise<void>;
}