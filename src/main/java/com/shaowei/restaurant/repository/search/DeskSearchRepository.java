package com.shaowei.restaurant.repository.search;

import com.shaowei.restaurant.domain.Desk;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Desk entity.
 */
public interface DeskSearchRepository extends ElasticsearchRepository<Desk, Long> {
}
