package com.shaowei.restaurant.service.impl;

import com.shaowei.restaurant.service.DeskService;
import com.shaowei.restaurant.domain.Desk;
import com.shaowei.restaurant.repository.DeskRepository;
import com.shaowei.restaurant.repository.search.DeskSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Desk.
 */
@Service
@Transactional
public class DeskServiceImpl implements DeskService{

    private final Logger log = LoggerFactory.getLogger(DeskServiceImpl.class);

    private final DeskRepository deskRepository;

    private final DeskSearchRepository deskSearchRepository;
    public DeskServiceImpl(DeskRepository deskRepository, DeskSearchRepository deskSearchRepository) {
        this.deskRepository = deskRepository;
        this.deskSearchRepository = deskSearchRepository;
    }

    /**
     * Save a desk.
     *
     * @param desk the entity to save
     * @return the persisted entity
     */
    @Override
    public Desk save(Desk desk) {
        log.debug("Request to save Desk : {}", desk);
        Desk result = deskRepository.save(desk);
        deskSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the desks.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Desk> findAll(Pageable pageable) {
        log.debug("Request to get all Desks");
        return deskRepository.findAll(pageable);
    }

    /**
     *  Get one desk by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Desk findOne(Long id) {
        log.debug("Request to get Desk : {}", id);
        return deskRepository.findOne(id);
    }

    /**
     *  Delete the  desk by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Desk : {}", id);
        deskRepository.delete(id);
        deskSearchRepository.delete(id);
    }

    /**
     * Search for the desk corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Desk> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Desks for query {}", query);
        Page<Desk> result = deskSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
