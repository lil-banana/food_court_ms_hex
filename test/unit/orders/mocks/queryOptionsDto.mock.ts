import { QueryOptionsDto } from '../../../../src/orders/infrastructure/controllers/dtos/queryOptions.dto';

export const QUERY_OPTIONS: QueryOptionsDto = {
    status: 'pending',
    page: 10,
    limit: 2
};

export const QUERY_OPTIONS_DEFAULT: QueryOptionsDto = {
    status: 'pending'
};