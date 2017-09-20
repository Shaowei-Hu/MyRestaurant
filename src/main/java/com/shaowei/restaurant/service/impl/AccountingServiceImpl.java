package com.shaowei.restaurant.service.impl;

import com.shaowei.restaurant.service.AccountingService;
import com.shaowei.restaurant.domain.Accounting;
import com.shaowei.restaurant.repository.AccountingRepository;
import com.shaowei.restaurant.repository.search.AccountingSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Accounting.
 */
@Service
@Transactional
public class AccountingServiceImpl implements AccountingService{

    private final Logger log = LoggerFactory.getLogger(AccountingServiceImpl.class);

    private final AccountingRepository accountingRepository;

    private final AccountingSearchRepository accountingSearchRepository;
    public AccountingServiceImpl(AccountingRepository accountingRepository, AccountingSearchRepository accountingSearchRepository) {
        this.accountingRepository = accountingRepository;
        this.accountingSearchRepository = accountingSearchRepository;
    }

    /**
     * Save a accounting.
     *
     * @param accounting the entity to save
     * @return the persisted entity
     */
    @Override
    public Accounting save(Accounting accounting) {
        log.debug("Request to save Accounting : {}", accounting);
        Accounting result = accountingRepository.save(accounting);
        accountingSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the accountings.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Accounting> findAll() {
        log.debug("Request to get all Accountings");
        return accountingRepository.findAll();
    }

    /**
     *  Get one accounting by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Accounting findOne(Long id) {
        log.debug("Request to get Accounting : {}", id);
        return accountingRepository.findOne(id);
    }

    /**
     *  Delete the  accounting by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Accounting : {}", id);
        accountingRepository.delete(id);
        accountingSearchRepository.delete(id);
    }

    /**
     * Search for the accounting corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Accounting> search(String query) {
        log.debug("Request to search Accountings for query {}", query);
        return StreamSupport
            .stream(accountingSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
