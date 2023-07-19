import { RestaurantName } from './value-objects/restaurantName.vo';
import { RestaurantNit } from './value-objects/restaurantNit.vo';
import { RestaurantTelephoneNumber } from './value-objects/restaurantTelephoneNumber.vo';

export class Restaurant {
    private readonly _id: string;
    private _name: RestaurantName;
    private readonly _nit: RestaurantNit;
    private _address: string;
    private _telephoneNumber: RestaurantTelephoneNumber;
    private _logoUrl: string;
    private _ownerId: string;

    constructor(id: string, name: string, nit: string, address: string, telephoneNumber: string, logoUrl: string, ownerId: string) {
        this._id = id;
        this._name = new RestaurantName(name);
        this._nit = new RestaurantNit(nit);
        this._address = address;
        this._telephoneNumber = new RestaurantTelephoneNumber(telephoneNumber);
        this._logoUrl = logoUrl;
        this._ownerId = ownerId;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name.value;
    }

    set name(name: string) {
        this._name = new RestaurantName(name);
    }

    get nit(): string {
        return this._nit.value;
    }

    get address(): string {
        return this._address;
    }

    set address(address: string) {
        this._address = address;
    }

    get telephoneNumber(): string {
        return this._telephoneNumber.value;
    }

    set telephoneNumber(telephoneNumber: string) {
        this._telephoneNumber = new RestaurantTelephoneNumber(telephoneNumber);
    }

    get logoUrl(): string {
        return this._logoUrl;
    }

    set logoUrl(logoUrl: string) {
        this._logoUrl = logoUrl;
    }

    get ownerId(): string {
        return this._ownerId;
    }

    set ownerId(ownerId: string) {
        this._ownerId = ownerId;
    }
}