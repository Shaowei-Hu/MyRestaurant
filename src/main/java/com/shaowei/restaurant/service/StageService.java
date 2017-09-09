package com.shaowei.restaurant.service;

import com.shaowei.restaurant.domain.Stage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Stage.
 */
public interface StageService {

    /**
     * Save a stage.
     *
     * @param stage the entity to save
     * @return the persisted entity
     */
    Stage save(Stage stage);

    /**
     *  Get all the stages.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Stage> findAll(Pageable pageable);

    /**
     *  Get the "id" stage.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Stage findOne(Long id);

    /**
     *  Delete the "id" stage.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the stage corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Stage> search(String query, Pageable pageable);
    
    /**
     *  Get the "id" stage with desk orders and payments.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
	Stage findOneEager(Long id);
}
