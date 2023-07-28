import { QueryOptionsDto } from '../../../../../../src/dishes/infrastructure/controllers/dtos/queryOptions.dto';
import { QueryOptionsDtoMapper } from '../../../../../../src/dishes/infrastructure/controllers/mappers/queryOptions.mapper';
import { QUERY_OPTIONS } from '../../../mocks/queryOptionsDto.mock';

describe('Query Options Dto Mapper', () => {
    let queryOptionsDtoMapper: QueryOptionsDtoMapper;

    beforeEach(() => {
        queryOptionsDtoMapper = new QueryOptionsDtoMapper();
    });

    describe('Success', () => {
        describe('toQueryOptions', () => {
            it('should map QueryOptionsDto to Query Options', () => {
                const queryOptions: QueryOptionsDto = QUERY_OPTIONS;
    
                const { page, limit, category } = queryOptionsDtoMapper.toQueryOptions(queryOptions);
    
                expect(page).toEqual(queryOptions.page);
                expect(limit).toEqual(queryOptions.limit);
                expect(category).toEqual(queryOptions.category);
            });

            it('should map PaginationDto to Pagination with default values', () => {
                const queryOptions: QueryOptionsDto = new QueryOptionsDto();
    
                const { page, limit, category } = queryOptionsDtoMapper.toQueryOptions(queryOptions);
    
                expect(page).toEqual(1);
                expect(limit).toEqual(10);
                expect(category).toEqual(undefined);
            });
        });
    });
});