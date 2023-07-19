import { Category } from '../../../../domain/models/category.model';
import { CategoryEntity } from '../entities/category.entity';

export class CategoryEntityMapper {
    toCategory(categoryEntity: CategoryEntity): Category {
        const category: Category = new Category(
            categoryEntity.id,
            categoryEntity.name,
            categoryEntity.description,
        );
        return category;
    }

    toCategoryEntity(category: Category): CategoryEntity {
        const categoryEntity: CategoryEntity = new CategoryEntity();
        categoryEntity.id = category.id;
        categoryEntity.name = category.name;
        categoryEntity.description = category.description;
        return categoryEntity;
    }
}