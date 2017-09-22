package com.shaowei.restaurant.service;

import com.shaowei.restaurant.domain.Ordre;
import com.shaowei.restaurant.domain.Payment;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Payment.
 */
public interface PaymentService {

    /**
     * Save a payment.
     *
     * @param payment the entity to save
     * @return the persisted entity
     */
    Payment save(Payment payment);

    /**
     *  Get all the payments.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Payment> findAll(Pageable pageable);

    /**
     *  Get the "id" payment.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Payment findOne(Long id);

    /**
     *  Delete the "id" payment.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the payment corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Payment> search(String query, Pageable pageable);

    /**
     * Create a payment.
     *
     * @param payment the entity to save
     * @return the persisted entity
     */
	Payment create(Payment payment);
	
    /**
     * Search for the payment corresponding to the filter.
     *
     *  @param from beginning date
     *  
     *  @param to end date
     *  @return the list of entities
     */
	List<Payment> filter(Date from, Date to);
}
