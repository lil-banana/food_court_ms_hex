import { PaginationDto } from '../../../../../../src/restaurants/infrastructure/controllers/dtos/pagination.dto';
import { PaginationDtoMapper } from '../../../../../../src/restaurants/infrastructure/controllers/mappers/pagination.mapper';
import { PAGINATION } from '../../../mocks/paginationDto.mock';

describe('Pagination Dto Mapper', () => {
    let paginationDtoMapper: PaginationDtoMapper;

    beforeEach(() => {
        paginationDtoMapper = new PaginationDtoMapper();
    });

    describe('Success', () => {
        describe('toPagination', () => {
            it('should map PaginationDto to Pagination', () => {
                const pagination: PaginationDto = PAGINATION;
    
                const { page, limit } = paginationDtoMapper.toPagination(pagination);
    
                expect(page).toEqual(pagination.page);
                expect(limit).toEqual(pagination.limit);
            });
            
            it('should map PaginationDto to Pagination with default values', () => {
                const pagination: PaginationDto = new PaginationDto();
    
                const { page, limit } = paginationDtoMapper.toPagination(pagination);
    
                expect(page).toEqual(1);
                expect(limit).toEqual(10);
            });
        });
    });
});