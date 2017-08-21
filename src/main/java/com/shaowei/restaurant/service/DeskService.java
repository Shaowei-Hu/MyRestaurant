package com.shaowei.restaurant.service;

import com.shaowei.restaurant.domain.Desk;
import com.shaowei.restaurant.repository.DeskRepository;
import com.shaowei.restaurant.repository.search.DeskSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Desk.
 */
@Service
@Transactional
public class DeskService {

    private final Logger log = LoggerFactory.getLogger(DeskService.class);
    
    private final DeskRepository deskRepository;

    private final DeskSearchRepository deskSearchRepository;

    public DeskService(DeskRepository deskRepository, DeskSearchRepository deskSearchRepository) {
        this.deskRepository = deskRepository;
        this.deskSearchRepository = deskSearchRepository;
    }

    /**
     * Save a desk.
     *
     * @param desk the entity to save
     * @return the persisted entity
     */
    public Desk save(Desk desk) {
        log.debug("Request to save Desk : {}", desk);
        Desk result = deskRepository.save(desk);
        deskSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the desks.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Desk> findAll() {
        log.debug("Request to get all Desks");
        List<Desk> result = deskRepository.findAll();

        return result;
    }

    /**
     *  Get one desk by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Desk findOne(Long id) {
        log.debug("Request to get Desk : {}", id);
        Desk desk = deskRepository.findOne(id);
        return desk;
    }
    
    /**
     *  Get one desk with orders by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Desk findOneEager(Long id) {
        log.debug("Request to get Desk : {}", id);
        Desk desk = deskRepository.findOne(id);
        desk.getOrdres().size();
        desk.getPayments().size();
        return desk;
    }

    /**
     *  Delete the  desk by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Desk : {}", id);
        deskRepository.delete(id);
        deskSearchRepository.delete(id);
    }

    /**
     * Search for the desk corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Desk> search(String query) {
        log.debug("Request to search Desks for query {}", query);
        return StreamSupport
            .stream(deskSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
