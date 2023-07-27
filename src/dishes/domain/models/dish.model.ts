import { DishPrice } from './value-objects/dishPrice.vo';
import { Category } from './category.model';
import { Restaurant } from '../../../restaurants/domain/models/restaurant.model';

export class Dish {
    private readonly _id: string;
    private readonly _name: string;
    private _price: DishPrice;
    private _description: string;
    private readonly _imageUrl: string;
    private readonly _category: Category;
    private _restaurant: Restaurant;
    private _active: boolean;

    constructor(id: string, name: string, price: number, description: string, imageUrl: string, category: Category, restaurant: Restaurant, active?: boolean) {
        this._id = id;
        this._name = name;
        this._price = new DishPrice(price);
        this._description = description;
        this._imageUrl = imageUrl;
        this._category = category;
        this._restaurant = restaurant;
        this._active = active ?? false;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price.value;
    }

    set price(price: number) {
        this._price = new DishPrice(price);
    }

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }

    get imageUrl(): string {
        return this._imageUrl;
    }

    get category(): Category {
        return this._category;
    }

    get restaurant(): Restaurant {
        return this._restaurant;
    }

    set restaurant(restaurant: Restaurant) {
        this._restaurant = restaurant;
    }

    get active(): boolean {
        return this._active;
    }

    set active(active: boolean) {
        this._active = active ?? false;
    }
}