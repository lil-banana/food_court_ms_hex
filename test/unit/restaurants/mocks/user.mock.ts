import { User } from '../../../../src/users/domain/models/user.model';
import { OWNER_ROLE, OWNER_ROLE_ONLY_ID, OTHER_ROLE, OTHER_ROLE_ONLY_ID } from './role.mock';

export const VALID_USER = new User(
    '5ce0e871-ecaf-477d-a443-230517a3fb6d',
    'John',
    'Doe',
    '123456789',
    '987654321',
    new Date('1990-01-01'),
    'john@example.com',
    'password',
    OWNER_ROLE
);

export const VALID_USER_NO_ID = new User(
    undefined,
    'John',
    'Doe',
    '123456789',
    '987654321',
    new Date('1990-01-01'),
    'john@example.com',
    'password',
    OTHER_ROLE_ONLY_ID
);

export const VALID_USER_NO_ID_NO_ROLE = new User(
    undefined,
    'John',
    'Doe',
    '123456789',
    '987654321',
    new Date('1990-01-01'),
    'john@example.com',
    'password',
    OWNER_ROLE_ONLY_ID
);

export const OTHER_USER = new User(
    '91a6c3f2-553e-421e-917a-2a2030b2236f',
    'Jane',
    'Doeh',
    '0123456789',
    '9876543210',
    new Date('1991-01-01'),
    'jane@example.com',
    'password1',
    OTHER_ROLE
);