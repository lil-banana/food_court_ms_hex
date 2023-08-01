import { Restaurant } from '../../../restaurants/domain/models/restaurant.model';
import { OrderItem } from './orderItem.model';

export class Order {
    private readonly _id: string;
    private readonly _clientId: string;
    private readonly _restaurant: Restaurant;
    private readonly _items: OrderItem[];
    private _status: string;
    
    constructor(id: string, clientId: string, restaurant: Restaurant, items: OrderItem[], status: string) {
        this._id = id;
        this._clientId = clientId;
        this._restaurant = restaurant;
        this._items = items;
        this._status = status;
    }

    get id(): string {
        return this._id;
    }

    get clientId(): string {
        return this._clientId;
    }

    get restaurant(): Restaurant {
        return this._restaurant;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    get status(): string {
        return this._status;
    }

    set status(status: string) {
        this._status = status;
    }
}