package com.shaowei.restaurant.repository.search;

import com.shaowei.restaurant.domain.Stage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Stage entity.
 */
public interface StageSearchRepository extends ElasticsearchRepository<Stage, Long> {
}
