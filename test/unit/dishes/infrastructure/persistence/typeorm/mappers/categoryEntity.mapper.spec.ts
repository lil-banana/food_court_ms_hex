import { Category } from '../../../../../../../src/dishes/domain/models/category.model';
import { CategoryEntity } from '../../../../../../../src/dishes/infrastructure/persistence/typeorm/entities/category.entity';
import { CategoryEntityMapper } from '../../../../../../../src/dishes/infrastructure/persistence/typeorm/mappers/categoryEntity.mapper';
import { SOUP_CATEGORY } from '../../../../mocks/category.mock';
import { SOUP_CATEGORY_ENTITY } from '../../../../mocks/categoryEntity.mock';

describe('Category Entity Mapper', () => {
  let categoryEntityMapper: CategoryEntityMapper;

  beforeEach(() => {
    categoryEntityMapper = new CategoryEntityMapper();
  });

  describe('toCategory', () => {
    it('should map CategoryEntity to Category', () => {
      const categoryEntity: CategoryEntity = SOUP_CATEGORY_ENTITY;
      const expectedCategory: Category = SOUP_CATEGORY;

      const category = categoryEntityMapper.toCategory(categoryEntity);

      expect(category).toEqual(expectedCategory);
    });
  });

  describe('toCategoryEntity', () => {
    it('should map Category to CategoryEntity', () => {
        const category: Category = SOUP_CATEGORY;
        const expectedCategoryEntity: CategoryEntity = SOUP_CATEGORY_ENTITY;

      const categoryEntity = categoryEntityMapper.toCategoryEntity(category);

      expect(categoryEntity).toEqual(expectedCategoryEntity);
    });
  });
});