package com.shaowei.restaurant.service;

import com.shaowei.restaurant.domain.Desk;
import com.shaowei.restaurant.web.rest.vm.DeskVM;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Desk.
 */
public interface DeskService {

    /**
     * Save a desk.
     *
     * @param desk the entity to save
     * @return the persisted entity
     */
    Desk save(Desk desk);

    /**
     *  Get all the desks.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Desk> findAll(Pageable pageable);

    /**
     *  Get the "id" desk.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Desk findOne(Long id);

    /**
     *  Delete the "id" desk.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the desk corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Desk> search(String query, Pageable pageable);

	Page<DeskVM> findAll(Pageable pageable, String desc);
}
