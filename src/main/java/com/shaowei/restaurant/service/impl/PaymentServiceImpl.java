package com.shaowei.restaurant.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shaowei.restaurant.domain.Ordre;
import com.shaowei.restaurant.domain.Payment;
import com.shaowei.restaurant.domain.Stage;
import com.shaowei.restaurant.repository.PaymentRepository;
import com.shaowei.restaurant.repository.search.PaymentSearchRepository;
import com.shaowei.restaurant.service.PaymentService;
import com.shaowei.restaurant.service.StageService;

/**
 * Service Implementation for managing Payment.
 */
@Service
@Transactional
public class PaymentServiceImpl implements PaymentService{

    private final Logger log = LoggerFactory.getLogger(PaymentServiceImpl.class);

    private final PaymentRepository paymentRepository;
    
    private final StageService stageService;

    private final PaymentSearchRepository paymentSearchRepository;
    public PaymentServiceImpl(PaymentRepository paymentRepository, PaymentSearchRepository paymentSearchRepository,
    		StageService stageService) {
        this.paymentRepository = paymentRepository;
        this.paymentSearchRepository = paymentSearchRepository;
        this.stageService = stageService;
    }
    
    /**
     * Create a payment.
     *
     * @param payment the entity to save
     * @return the persisted entity
     */
    @Override
    public Payment create(Payment payment) {
        log.debug("Request to save Payment : {}", payment);
        Payment result = paymentRepository.save(payment);
        Stage stage = stageService.findOne(result.getStage().getId());
        stage.addPayment(result);
        if(stage.getAmountPaid() != null) {
        	stage.setAmountPaid(stage.getAmountPaid().add(result.getAmount()));
        } else {
        	stage.setAmountPaid(result.getAmount());
        }
        paymentSearchRepository.save(result);
        return result;
    }

    /**
     * Save(update) a payment.
     *
     * @param payment the entity to save
     * @return the persisted entity
     */
    @Override
    public Payment save(Payment payment) {
        log.debug("Request to save Payment : {}", payment);
        Stage stage = stageService.findOne(payment.getStage().getId());
        stage.setAmountPaid(stage.getAmountPaid().subtract(payment.getAmount()));
        Payment result = paymentRepository.save(payment);
        stage.addPayment(result);
        stage.setAmountPaid(stage.getAmountPaid().add(result.getAmount()));

        paymentSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the payments.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Payment> findAll(Pageable pageable) {
        log.debug("Request to get all Payments");
        return paymentRepository.findAll(pageable);
    }

    /**
     *  Get one payment by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Payment findOne(Long id) {
        log.debug("Request to get Payment : {}", id);
        return paymentRepository.findOne(id);
    }

    /**
     *  Delete the  payment by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Payment : {}", id);
        paymentRepository.delete(id);
        paymentSearchRepository.delete(id);
    }

    /**
     * Search for the payment corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Payment> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Payments for query {}", query);
        Page<Payment> result = paymentSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
    
	@Override
	public List<Payment> filter(Date from, Date to) {
        log.debug("Request to search for all of Ordres for filter", from + "--" + to);
        List<Payment> result = paymentSearchRepository.findByCreationDateBetweenOrderByCreationDateAsc(from, to);
        return result;
	}
}
