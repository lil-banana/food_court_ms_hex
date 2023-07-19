export class Category {
    private readonly _id: string;
    private readonly _name: string;
    private _description: string;

    constructor(id: string, name: string, description: string) {
        this._id = id;
        this._name = name;
        this._description = description;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }
}