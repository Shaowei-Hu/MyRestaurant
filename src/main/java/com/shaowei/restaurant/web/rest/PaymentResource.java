package com.shaowei.restaurant.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;
import com.shaowei.restaurant.domain.Payment;
import com.shaowei.restaurant.service.PaymentService;
import com.shaowei.restaurant.web.rest.util.HeaderUtil;
import com.shaowei.restaurant.web.rest.util.PaginationUtil;

import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;

/**
 * REST controller for managing Payment.
 */
@RestController
@RequestMapping("/api")
public class PaymentResource {

    private final Logger log = LoggerFactory.getLogger(PaymentResource.class);

    private static final String ENTITY_NAME = "payment";

    private final PaymentService paymentService;

    public PaymentResource(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    /**
     * POST  /payments : Create a new payment.
     *
     * @param payment the payment to create
     * @return the ResponseEntity with status 201 (Created) and with body the new payment, or with status 400 (Bad Request) if the payment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/payments")
    @Timed
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) throws URISyntaxException {
        log.debug("REST request to save Payment : {}", payment);
        if (payment.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new payment cannot already have an ID")).body(null);
        }
        Payment result = paymentService.create(payment);
        return ResponseEntity.created(new URI("/api/payments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /payments : Updates an existing payment.
     *
     * @param payment the payment to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated payment,
     * or with status 400 (Bad Request) if the payment is not valid,
     * or with status 500 (Internal Server Error) if the payment couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/payments")
    @Timed
    public ResponseEntity<Payment> updatePayment(@RequestBody Payment payment) throws URISyntaxException {
        log.debug("REST request to update Payment : {}", payment);
        if (payment.getId() == null) {
            return createPayment(payment);
        }
        Payment result = paymentService.save(payment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, payment.getId().toString()))
            .body(result);
    }

    /**
     * GET  /payments : get all the payments.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of payments in body
     */
    @GetMapping("/payments")
    @Timed
    public ResponseEntity<List<Payment>> getAllPayments(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Payments");
        Page<Payment> page = paymentService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/payments");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /payments/:id : get the "id" payment.
     *
     * @param id the id of the payment to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the payment, or with status 404 (Not Found)
     */
    @GetMapping("/payments/{id}")
    @Timed
    public ResponseEntity<Payment> getPayment(@PathVariable Long id) {
        log.debug("REST request to get Payment : {}", id);
        Payment payment = paymentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(payment));
    }

    /**
     * DELETE  /payments/:id : delete the "id" payment.
     *
     * @param id the id of the payment to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/payments/{id}")
    @Timed
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        log.debug("REST request to delete Payment : {}", id);
        paymentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/payments?query=:query : search for the payment corresponding
     * to the query.
     *
     * @param query the query of the payment search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/payments")
    @Timed
    public ResponseEntity<List<Payment>> searchPayments(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of Payments for query {}", query);
        Page<Payment> page = paymentService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/payments");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    
    @GetMapping("/_search/filter/payments")
    @Timed
    public ResponseEntity<List<Payment>> filterPayments(
    		@RequestParam(value = "fromDate") @DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm") Date fromDate,
    		@RequestParam(value = "toDate") @DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm") Date toDate) {
        log.debug("REST request to search for all of Ordres for filter {}", fromDate + "--" + toDate);
        List<Payment> page = paymentService.filterSearch(fromDate, toDate);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

}
