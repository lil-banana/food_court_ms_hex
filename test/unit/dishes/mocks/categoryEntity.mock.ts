import { CategoryEntity } from '../../../../src/dishes/infrastructure/persistence/typeorm/entities/category.entity';
import { SOUP_CATEGORY } from './category.mock';

export const SOUP_CATEGORY_ENTITY: CategoryEntity = {
    id: SOUP_CATEGORY.id,
    name: SOUP_CATEGORY.name,
    description: SOUP_CATEGORY.description,
    createdAt: undefined,
    updatedAt: undefined
}