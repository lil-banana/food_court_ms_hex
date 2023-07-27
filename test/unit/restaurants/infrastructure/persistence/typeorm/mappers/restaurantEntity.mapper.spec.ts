import { Restaurant } from '../../../../../../../src/restaurants/domain/models/restaurant.model';
import { RestaurantEntity } from '../../../../../../../src/restaurants/infrastructure/persistence/typeorm/entities/restaurant.entity';
import { RestaurantEntityMapper } from '../../../../../../../src/restaurants/infrastructure/persistence/typeorm/mappers/restaurantEntity.mapper';
import { VALID_RESTAURANT_ENTITY, VALID_RESTAURANT_ENTITY_NO_ID } from '../../../../mocks/restaurantEntity.mock';
import { VALID_RESTAURANT, VALID_RESTAURANT_NO_ID } from '../../../../mocks/restaurant.mock';

describe('Restaurant Entity Mapper', () => {
  let restaurantEntityMapper: RestaurantEntityMapper;

  beforeEach(() => {
    restaurantEntityMapper = new RestaurantEntityMapper();
  });

  describe('toRestaurant', () => {
    it('should map RestaurantEntity to Restaurant', () => {
      const restaurantEntity: RestaurantEntity = VALID_RESTAURANT_ENTITY;
      const expectedRestaurant: Restaurant = VALID_RESTAURANT;

      const restaurant = restaurantEntityMapper.toRestaurant(restaurantEntity);

      expect(restaurant).toEqual(expectedRestaurant);
    });
  });

  describe('toRestaurantList', () => {
    it('should map RestaurantEntityList to RestaurantList', () => {
      const restaurantEntityList: RestaurantEntity[] = [ VALID_RESTAURANT_ENTITY ];
      const expectedRestaurantList: Restaurant[] = [ VALID_RESTAURANT ];

      const restaurants = restaurantEntityMapper.toRestaurantList(restaurantEntityList);

      expect(restaurants).toEqual(expectedRestaurantList);
    });
  });

  describe('toRestaurantEntity', () => {
    it('should map Restaurant to RestaurantEntity', () => {
      const restaurant: Restaurant = VALID_RESTAURANT_NO_ID;
      const expectedRestaurantEntity: RestaurantEntity = VALID_RESTAURANT_ENTITY_NO_ID;

      const restaurantEntity = restaurantEntityMapper.toRestaurantEntity(restaurant);

      expect(restaurantEntity).toEqual(expectedRestaurantEntity);
    });
  });
});