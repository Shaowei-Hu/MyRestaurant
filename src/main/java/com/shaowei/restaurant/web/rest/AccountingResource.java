package com.shaowei.restaurant.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.shaowei.restaurant.domain.Accounting;
import com.shaowei.restaurant.service.AccountingService;
import com.shaowei.restaurant.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Accounting.
 */
@RestController
@RequestMapping("/api")
public class AccountingResource {

    private final Logger log = LoggerFactory.getLogger(AccountingResource.class);

    private static final String ENTITY_NAME = "accounting";

    private final AccountingService accountingService;

    public AccountingResource(AccountingService accountingService) {
        this.accountingService = accountingService;
    }

    /**
     * POST  /accountings : Create a new accounting.
     *
     * @param accounting the accounting to create
     * @return the ResponseEntity with status 201 (Created) and with body the new accounting, or with status 400 (Bad Request) if the accounting has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/accountings")
    @Timed
    public ResponseEntity<Accounting> createAccounting(@RequestBody Accounting accounting) throws URISyntaxException {
        log.debug("REST request to save Accounting : {}", accounting);
        if (accounting.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new accounting cannot already have an ID")).body(null);
        }
        Accounting result = accountingService.save(accounting);
        return ResponseEntity.created(new URI("/api/accountings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /accountings : Updates an existing accounting.
     *
     * @param accounting the accounting to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated accounting,
     * or with status 400 (Bad Request) if the accounting is not valid,
     * or with status 500 (Internal Server Error) if the accounting couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/accountings")
    @Timed
    public ResponseEntity<Accounting> updateAccounting(@RequestBody Accounting accounting) throws URISyntaxException {
        log.debug("REST request to update Accounting : {}", accounting);
        if (accounting.getId() == null) {
            return createAccounting(accounting);
        }
        Accounting result = accountingService.save(accounting);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, accounting.getId().toString()))
            .body(result);
    }

    /**
     * GET  /accountings : get all the accountings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of accountings in body
     */
    @GetMapping("/accountings")
    @Timed
    public List<Accounting> getAllAccountings() {
        log.debug("REST request to get all Accountings");
        return accountingService.findAll();
        }

    /**
     * GET  /accountings/:id : get the "id" accounting.
     *
     * @param id the id of the accounting to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the accounting, or with status 404 (Not Found)
     */
    @GetMapping("/accountings/{id}")
    @Timed
    public ResponseEntity<Accounting> getAccounting(@PathVariable Long id) {
        log.debug("REST request to get Accounting : {}", id);
        Accounting accounting = accountingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(accounting));
    }

    /**
     * DELETE  /accountings/:id : delete the "id" accounting.
     *
     * @param id the id of the accounting to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/accountings/{id}")
    @Timed
    public ResponseEntity<Void> deleteAccounting(@PathVariable Long id) {
        log.debug("REST request to delete Accounting : {}", id);
        accountingService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/accountings?query=:query : search for the accounting corresponding
     * to the query.
     *
     * @param query the query of the accounting search
     * @return the result of the search
     */
    @GetMapping("/_search/accountings")
    @Timed
    public List<Accounting> searchAccountings(@RequestParam String query) {
        log.debug("REST request to search Accountings for query {}", query);
        return accountingService.search(query);
    }

}
