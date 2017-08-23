package com.shaowei.restaurant.service;

import com.shaowei.restaurant.domain.Ordre;
import com.shaowei.restaurant.repository.OrdreRepository;
import com.shaowei.restaurant.repository.search.OrdreSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Ordre.
 */
@Service
@Transactional
public class OrdreService {

    private final Logger log = LoggerFactory.getLogger(OrdreService.class);

    private final OrdreRepository ordreRepository;

    private final OrdreSearchRepository ordreSearchRepository;
    public OrdreService(OrdreRepository ordreRepository, OrdreSearchRepository ordreSearchRepository) {
        this.ordreRepository = ordreRepository;
        this.ordreSearchRepository = ordreSearchRepository;
    }

    /**
     * Save a ordre.
     *
     * @param ordre the entity to save
     * @return the persisted entity
     */
    public Ordre save(Ordre ordre) {
        log.debug("Request to save Ordre : {}", ordre);
        Ordre result = ordreRepository.save(ordre);
        ordreSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the ordres.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Ordre> findAll(Pageable pageable) {
        log.debug("Request to get all Ordres");
        return ordreRepository.findAll(pageable);
    }

    /**
     *  Get one ordre by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Ordre findOne(Long id) {
        log.debug("Request to get Ordre : {}", id);
        return ordreRepository.findOne(id);
    }

    /**
     *  Delete the  ordre by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Ordre : {}", id);
        ordreRepository.delete(id);
        ordreSearchRepository.delete(id);
    }

    /**
     * Search for the ordre corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Ordre> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Ordres for query {}", query);
        Page<Ordre> result = ordreSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
