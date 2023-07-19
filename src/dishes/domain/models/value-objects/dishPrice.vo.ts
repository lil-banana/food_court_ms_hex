import { InvalidArgumentError } from '../../exceptions/invalidArgumentError.exception';

export class DishPrice {
    constructor(readonly value: number) {
        this.value = value;
        this.ensureValueIsDefined(value);
        this.ensureIsValidName(value);
    }

    private ensureValueIsDefined(value: number | undefined | null): void {
        if (value === null || value === undefined) {
            throw new InvalidArgumentError('Value must be defined');
        }
    }

    private ensureIsValidName(value: number): void {
        if (value <= 0) {
            throw new InvalidArgumentError(`${value} is not a valid price`);
        }
    }
}