import { Dish } from '../../../dishes/domain/models/dish.model';

export class OrderItem {
    private readonly _id: string;
    private readonly _dish: Dish;
    private readonly _quantity: number;
    
    constructor(id: string, dish: Dish, quantity: number) {
        this._id = id;
        this._dish = dish;
        this._quantity = quantity;
    }

    get id(): string {
        return this._id;
    }

    get dish(): Dish {
        return this._dish;
    }

    get quantity(): number {
        return this._quantity;
    }
}