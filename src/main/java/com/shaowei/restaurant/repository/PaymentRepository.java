package com.shaowei.restaurant.repository;

import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shaowei.restaurant.domain.Payment;


/**
 * Spring Data JPA repository for the Payment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

	List<Payment> findByCreationDateBetweenOrderByCreationDateAsc(ZonedDateTime from, ZonedDateTime to);
	
}
