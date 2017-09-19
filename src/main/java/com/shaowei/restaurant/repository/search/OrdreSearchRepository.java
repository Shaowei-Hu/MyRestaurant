package com.shaowei.restaurant.repository.search;

import java.util.Date;
import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.shaowei.restaurant.domain.Ordre;

/**
 * Spring Data Elasticsearch repository for the Ordre entity.
 */
public interface OrdreSearchRepository extends ElasticsearchRepository<Ordre, Long> {
	
	List<Ordre> findByCreationDateBetweenOrderByCreationDateAsc(Date from, Date to);
}
