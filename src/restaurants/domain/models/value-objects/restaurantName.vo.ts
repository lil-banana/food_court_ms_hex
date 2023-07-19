import { InvalidArgumentError } from '../../exceptions/invalidArgumentError.exception';

export class RestaurantName {
    private readonly validNameRegExp = /^.*\D.*$/;

    constructor(readonly value: string) {
        this.value = value;
        this.ensureValueIsDefined(value);
        this.ensureIsValidName(value);
    }

    private ensureValueIsDefined(value: string | undefined | null): void {
        if (value === null || value === undefined || value === '') {
            throw new InvalidArgumentError('Value must be defined');
        }
    }

    private ensureIsValidName(value: string): void {
        if (!this.validNameRegExp.test(value)) {
            throw new InvalidArgumentError(`${value} is not a valid name`);
        }
    }
}