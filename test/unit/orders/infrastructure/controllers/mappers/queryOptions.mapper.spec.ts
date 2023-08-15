import { QUERY_OPTIONS, QUERY_OPTIONS_DEFAULT } from '../../../mocks/queryOptionsDto.mock';
import { QueryOptionsDtoMapper } from '../../../../../../src/orders/infrastructure/controllers/mappers/queryOptions.mapper';
import { QueryOptionsDto } from '../../../../../../src/orders/infrastructure/controllers/dtos/queryOptions.dto';

describe('Order Item Response Mapper', () => {
    let queryOptionsDtoMapper: QueryOptionsDtoMapper;

    beforeEach(() => {
        queryOptionsDtoMapper = new QueryOptionsDtoMapper();
    });

    describe('Success', () => {
        describe('toQueryOptions', () => {
            it('should map QueryOptions Dto to Query Options', () => {
                const queryOptionsDto: QueryOptionsDto = QUERY_OPTIONS;
                
                const result = queryOptionsDtoMapper.toQueryOptions(queryOptionsDto);

                expect(result).toEqual({ ...queryOptionsDto });
            });

            it('should map QueryOptions Dto to Query Options with default values', () => {
                const queryOptionsDto: QueryOptionsDto = QUERY_OPTIONS_DEFAULT;
                
                const result = queryOptionsDtoMapper.toQueryOptions(queryOptionsDto);

                expect(result).toEqual({ status: queryOptionsDto.status, page: 1, limit: 10 });
            });
        });
    });
});