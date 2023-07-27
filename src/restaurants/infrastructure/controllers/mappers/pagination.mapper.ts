import { PaginationDto } from '../dtos/pagination.dto';

export class PaginationDtoMapper {
    toPagination(paginationDto: PaginationDto): any {
        return { page: paginationDto.page ?? 1, limit: paginationDto.limit ?? 10 };
    }
}