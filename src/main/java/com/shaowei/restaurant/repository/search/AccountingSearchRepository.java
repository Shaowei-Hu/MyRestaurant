package com.shaowei.restaurant.repository.search;

import com.shaowei.restaurant.domain.Accounting;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Accounting entity.
 */
public interface AccountingSearchRepository extends ElasticsearchRepository<Accounting, Long> {
}
