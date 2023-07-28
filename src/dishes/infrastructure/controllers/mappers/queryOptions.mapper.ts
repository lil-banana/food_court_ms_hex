import { QueryOptionsDto } from '../dtos/queryOptions.dto';

export class QueryOptionsDtoMapper {
    toQueryOptions(queryOptionsDto: QueryOptionsDto): any {
        return { page: queryOptionsDto.page ?? 1, limit: queryOptionsDto.limit ?? 10, category: queryOptionsDto.category };
    }
}