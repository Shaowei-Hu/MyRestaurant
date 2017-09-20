package com.shaowei.restaurant.service;

import com.shaowei.restaurant.domain.Accounting;
import java.util.List;

/**
 * Service Interface for managing Accounting.
 */
public interface AccountingService {

    /**
     * Save a accounting.
     *
     * @param accounting the entity to save
     * @return the persisted entity
     */
    Accounting save(Accounting accounting);

    /**
     *  Get all the accountings.
     *
     *  @return the list of entities
     */
    List<Accounting> findAll();

    /**
     *  Get the "id" accounting.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Accounting findOne(Long id);

    /**
     *  Delete the "id" accounting.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the accounting corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @return the list of entities
     */
    List<Accounting> search(String query);
}
