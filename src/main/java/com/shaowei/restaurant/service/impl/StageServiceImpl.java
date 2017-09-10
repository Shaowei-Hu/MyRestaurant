package com.shaowei.restaurant.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import java.time.ZonedDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shaowei.restaurant.domain.Stage;
import com.shaowei.restaurant.repository.StageRepository;
import com.shaowei.restaurant.repository.search.StageSearchRepository;
import com.shaowei.restaurant.service.StageService;

/**
 * Service Implementation for managing Stage.
 */
@Service
@Transactional
public class StageServiceImpl implements StageService{

    private final Logger log = LoggerFactory.getLogger(StageServiceImpl.class);

    private final StageRepository stageRepository;

    private final StageSearchRepository stageSearchRepository;
    public StageServiceImpl(StageRepository stageRepository, StageSearchRepository stageSearchRepository) {
        this.stageRepository = stageRepository;
        this.stageSearchRepository = stageSearchRepository;
    }

    /**
     * Save a stage.
     *
     * @param stage the entity to save
     * @return the persisted entity
     */
    @Override
    public Stage save(Stage stage) {
        log.debug("Request to save Stage : {}", stage);
//        if (stage.getCreationDate() == null) {
//        	stage.setCreationDate(ZonedDateTime.now());
//        }
        Stage result = stageRepository.save(stage);
        stageSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the stages.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Stage> findAll(Pageable pageable) {
        log.debug("Request to get all Stages");
        return stageRepository.findAll(pageable);
    }

    /**
     *  Get one stage by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Stage findOne(Long id) {
        log.debug("Request to get Stage : {}", id);
        return stageRepository.findOne(id);
    }
    
    /**
     *  Get one stage by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Stage findOneEager(Long id) {
        log.debug("Request to get Stage : {}", id);
        Stage stage = stageRepository.findOne(id);
        if(stage.getDesk() != null) {
        	stage.getDesk().getName();
        }
        if(stage.getOrdres() != null) {
        	stage.getOrdres().size();
        }
        if(stage.getPayments() != null) {
        	stage.getPayments().size();
        }
        return stage;
    }

    /**
     *  Delete the  stage by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Stage : {}", id);
        stageRepository.delete(id);
        stageSearchRepository.delete(id);
    }

    /**
     * Search for the stage corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Stage> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Stages for query {}", query);
        Page<Stage> result = stageSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
