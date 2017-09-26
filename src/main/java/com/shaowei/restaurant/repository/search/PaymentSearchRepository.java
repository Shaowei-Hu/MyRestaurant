package com.shaowei.restaurant.repository.search;

import java.util.Date;
import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.shaowei.restaurant.domain.Payment;

/**
 * Spring Data Elasticsearch repository for the Payment entity.
 */
public interface PaymentSearchRepository extends ElasticsearchRepository<Payment, Long> {
	
	List<Payment> findByCreationDateBetweenOrderByCreationDateAsc(Date from, Date to);
	
}
