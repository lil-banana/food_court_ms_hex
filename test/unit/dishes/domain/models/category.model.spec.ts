import { Category } from '../../../../../src/dishes/domain/models/category.model';
import { SOUP_CATEGORY, OTHER_CATEGORY } from '../../mocks/category.mock';

describe('Category Model', () => {
    describe('Success', () => {
        it('should create a new category with valid arguments', () => {
            const category: Category = new Category(SOUP_CATEGORY.id, SOUP_CATEGORY.name, SOUP_CATEGORY.description);
            expect(category.id).toBe(SOUP_CATEGORY.id);
            expect(category.name).toBe(SOUP_CATEGORY.name);
            expect(category.description).toBe(SOUP_CATEGORY.description);
        });

        it('should update category description', () => {
            const category: Category = SOUP_CATEGORY;
            category.description = OTHER_CATEGORY.description;

            expect(category.description).toBe(OTHER_CATEGORY.description);
        });
    });
});