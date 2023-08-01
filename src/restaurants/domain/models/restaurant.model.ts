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

    constructor(id: string, address: string, logoUrl: string, ownerId: string, name?: string, nit?: string, telephoneNumber?: string) {
        this._id = id;
        this._address = address;
        this._logoUrl = logoUrl;
        this._ownerId = ownerId;
        this._name = name ? new RestaurantName(name): undefined;
        this._nit = nit ? new RestaurantNit(nit): undefined;
        this._telephoneNumber = telephoneNumber ? new RestaurantTelephoneNumber(telephoneNumber): undefined;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name?.value;
    }

    set name(name: string) {
        this._name = new RestaurantName(name);
    }

    get nit(): string {
        return this._nit?.value;
    }

    get address(): string {
        return this._address;
    }

    set address(address: string) {
        this._address = address;
    }

    get telephoneNumber(): string {
        return this._telephoneNumber?.value;
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