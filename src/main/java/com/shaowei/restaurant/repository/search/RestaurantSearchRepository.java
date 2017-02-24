package com.shaowei.restaurant.repository.search;

import com.shaowei.restaurant.domain.Restaurant;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Restaurant entity.
 */
public interface RestaurantSearchRepository extends ElasticsearchRepository<Restaurant, Long> {
}
