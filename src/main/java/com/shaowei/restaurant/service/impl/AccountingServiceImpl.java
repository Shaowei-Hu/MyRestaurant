package com.shaowei.restaurant.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shaowei.restaurant.domain.Accounting;
import com.shaowei.restaurant.domain.Payment;
import com.shaowei.restaurant.domain.enumeration.PaymentType;
import com.shaowei.restaurant.repository.AccountingRepository;
import com.shaowei.restaurant.repository.search.AccountingSearchRepository;
import com.shaowei.restaurant.service.AccountingService;
import com.shaowei.restaurant.service.PaymentService;

/**
 * Service Implementation for managing Accounting.
 */
@Service
@Transactional
public class AccountingServiceImpl implements AccountingService{

    private final Logger log = LoggerFactory.getLogger(AccountingServiceImpl.class);

    private final AccountingRepository accountingRepository;

    private final AccountingSearchRepository accountingSearchRepository;
    
    private final PaymentService paymentService;
    public AccountingServiceImpl(AccountingRepository accountingRepository, AccountingSearchRepository accountingSearchRepository,
    		PaymentService paymentService) {
        this.accountingRepository = accountingRepository;
        this.accountingSearchRepository = accountingSearchRepository;
        this.paymentService = paymentService;
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
        if(accounting.getCard()==null && accounting.getCash()==null && accounting.getCheck()==null && accounting.getOther()==null
        		&& accounting.getTotal()==null){
        	accounting.setCard(new BigDecimal(0.00));
        	accounting.setCash(new BigDecimal(0.00));
        	accounting.setCheck(new BigDecimal(0.00));
        	accounting.setTicket(new BigDecimal(0.00));
        	accounting.setOther(new BigDecimal(0.00));
        	accounting.setTotal(new BigDecimal(0.00));
        	List<Payment> payments = paymentService.filter(accounting.getStartTime(), accounting.getEndTime());
        	payments.forEach(payment -> {
        		if(payment.getType() == PaymentType.CARD){
        			accounting.setCard(accounting.getCard().add(payment.getAmount()));
        		}
        		if(payment.getType() == PaymentType.CASH){
        			accounting.setCash(accounting.getCash().add(payment.getAmount()));
        		}
        		if(payment.getType() == PaymentType.CHECK){
        			accounting.setCheck(accounting.getCheck().add(payment.getAmount()));
        		}
        		if(payment.getType() == PaymentType.TICKET){
        			accounting.setTicket(accounting.getTicket().add(payment.getAmount()));
        		}
        		if(payment.getType() == PaymentType.OTHER){
        			accounting.setOther(accounting.getOther().add(payment.getAmount()));
        		}
        		accounting.setTotal(accounting.getTotal().add(payment.getAmount()));
        	});
        }
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
