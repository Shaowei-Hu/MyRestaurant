package com.shaowei.restaurant.repository.search;

import com.shaowei.restaurant.domain.Ordre;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Ordre entity.
 */
public interface OrdreSearchRepository extends ElasticsearchRepository<Ordre, Long> {
}
