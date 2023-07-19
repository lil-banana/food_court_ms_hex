import { InvalidArgumentError } from '../../exceptions/invalidArgumentError.exception';

export class RestaurantNit {
    private readonly validNitRegExp = /^\d+$/;

    constructor(readonly value: string) {
        this.value = value;
        this.ensureValueIsDefined(value);
        this.ensureIsValidNit(value);
    }

    private ensureValueIsDefined(value: string | undefined | null): void {
        if (value === null || value === undefined || value === '') {
            throw new InvalidArgumentError('Value must be defined');
        }
    }

    private ensureIsValidNit(value: string): void {
        if (!this.validNitRegExp.test(value)) {
            throw new InvalidArgumentError(`${value} is not a valid NIT`);
        }
    }
}