package com.shaowei.restaurant.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import java.math.BigDecimal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shaowei.restaurant.domain.Ordre;
import com.shaowei.restaurant.domain.Stage;
import com.shaowei.restaurant.repository.OrdreRepository;
import com.shaowei.restaurant.repository.search.OrdreSearchRepository;
import com.shaowei.restaurant.service.OrdreService;
import com.shaowei.restaurant.service.StageService;
import com.shaowei.restaurant.web.rest.vm.OrdreVM;

/**
 * Service Implementation for managing Ordre.
 */
@Service
@Transactional
public class OrdreServiceImpl implements OrdreService{

    private final Logger log = LoggerFactory.getLogger(OrdreServiceImpl.class);

    private final OrdreRepository ordreRepository;
    
    private final StageService stageService;

    private final OrdreSearchRepository ordreSearchRepository;
    public OrdreServiceImpl(OrdreRepository ordreRepository, OrdreSearchRepository ordreSearchRepository,
    		StageService stageService) {
        this.ordreRepository = ordreRepository;
        this.ordreSearchRepository = ordreSearchRepository;
        this.stageService = stageService;
    }

    /**
     * Save a ordre.
     *
     * @param ordre the entity to save
     * @return the persisted entity
     */
    @Override
    public Ordre save(Ordre ordre) {
        log.debug("Request to save Ordre : {}", ordre);
        Ordre result = ordreRepository.save(ordre);
        ordreSearchRepository.save(result);
        return result;
    }
    
	/**
	 * Save a ordre array.
	 *
	 * @param ordres
	 *            the entity array to save
	 * @return the persisted entity array
	 */
	public Ordre[] save(OrdreVM[] ordres) {
		log.debug("Request to save Ordre array: {}", ordres.toString());
		BigDecimal amount = new BigDecimal(0);
		Stage stage = stageService.findOne(ordres[0].getStage());
		Ordre[] result = new Ordre[ordres.length];
		for (int i = 0; i < ordres.length; i++) {
			Ordre ordre = new Ordre();
			ordre.setStage(stage);
			ordre.setName(ordres[i].getName());
			ordre.setPrice(ordres[i].getPrice());
			stage.addOrdre(ordre);
			result[i] = ordreRepository.save(ordre);
			ordreSearchRepository.save(ordre);
			amount = amount.add(ordre.getPrice());
		}
		if (stage.getAmount() != null){
			stage.setAmount(stage.getAmount().add(amount));
		} else {
			stage.setAmount(amount);
		}
		stageService.save(stage);
		return result;
	}  

    /**
     *  Get all the ordres.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
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
    @Override
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
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Ordre : {}", id);
        Ordre ordre = ordreRepository.findOne(id);
        Stage stage = ordre.getStage();
        stage.getOrdres().remove(ordre);
        stage.setAmount(stage.getAmount().subtract(ordre.getPrice()));
        ordreRepository.delete(id);
        ordreSearchRepository.delete(id);
        stageService.save(stage);
    }

    /**
     * Search for the ordre corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Ordre> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Ordres for query {}", query);
        Page<Ordre> result = ordreSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
