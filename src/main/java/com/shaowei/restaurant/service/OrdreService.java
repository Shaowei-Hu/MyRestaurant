package com.shaowei.restaurant.service;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shaowei.restaurant.domain.Desk;
import com.shaowei.restaurant.domain.Ordre;
import com.shaowei.restaurant.repository.OrdreRepository;
import com.shaowei.restaurant.repository.search.OrdreSearchRepository;
import com.shaowei.restaurant.service.dto.OrderDTO;

/**
 * Service Implementation for managing Ordre.
 */
@Service
@Transactional
public class OrdreService {

    private final Logger log = LoggerFactory.getLogger(OrdreService.class);
    
    private final OrdreRepository ordreRepository;

    private final OrdreSearchRepository ordreSearchRepository;
    
    private final DeskService deskService;

    public OrdreService(OrdreRepository ordreRepository, OrdreSearchRepository ordreSearchRepository, DeskService deskService) {
        this.ordreRepository = ordreRepository;
        this.ordreSearchRepository = ordreSearchRepository;
        this.deskService = deskService;
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
     * Save a ordre array.
     *
     * @param ordres the entity array to save
     * @return the persisted entity array
     */
    public Ordre[] save(OrderDTO[] ordres) {
        log.debug("Request to save Ordre array: {}", ordres.toString());
        Ordre[] result = new Ordre[ordres.length];
        for(int i=0; i<ordres.length; i++){
        	Desk desk = deskService.findOne(ordres[i].getDesk());
        	Ordre ordre = new Ordre();
        	ordre.setDesk(desk);
        	ordre.setName(ordres[i].getName());
        	ordre.setPrice(ordres[i].getPrice());
            result[i] = ordreRepository.save(ordre);
            ordreSearchRepository.save(ordre);
        }
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
        Page<Ordre> result = ordreRepository.findAll(pageable);
        return result;
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
        Ordre ordre = ordreRepository.findOne(id);
        return ordre;
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
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Ordre> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Ordres for query {}", query);
        Page<Ordre> result = ordreSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
