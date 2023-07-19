import { InvalidArgumentError } from '../../exceptions/invalidArgumentError.exception';

export class RestaurantTelephoneNumber {
    private readonly validTelephoneNumberRegExp = /^(?:\+\d{1,12}|\d{1,13})$/;

    constructor(readonly value: string) {
        this.value = value;
        this.ensureValueIsDefined(value);
        this.ensureIsValidTelephoneNumber(value);
    }

    private ensureValueIsDefined(value: string | undefined | null): void {
        if (value === null || value === undefined || value === '') {
            throw new InvalidArgumentError('Value must be defined');
        }
    }

    private ensureIsValidTelephoneNumber(value: string): void {
        if (!this.validTelephoneNumberRegExp.test(value)) {
            throw new InvalidArgumentError(`${value} is not a valid Telephone number`);
        }
    }
}