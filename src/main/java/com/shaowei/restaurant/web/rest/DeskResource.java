package com.shaowei.restaurant.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
import com.shaowei.restaurant.domain.Desk;
import com.shaowei.restaurant.service.DeskService;
import com.shaowei.restaurant.web.rest.util.HeaderUtil;
import com.shaowei.restaurant.web.rest.util.PaginationUtil;
import com.shaowei.restaurant.web.rest.vm.DeskVM;

import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;

/**
 * REST controller for managing Desk.
 */
@RestController
@RequestMapping("/api")
public class DeskResource {

    private final Logger log = LoggerFactory.getLogger(DeskResource.class);

    private static final String ENTITY_NAME = "desk";

    private final DeskService deskService;

    public DeskResource(DeskService deskService) {
        this.deskService = deskService;
    }

    /**
     * POST  /desks : Create a new desk.
     *
     * @param desk the desk to create
     * @return the ResponseEntity with status 201 (Created) and with body the new desk, or with status 400 (Bad Request) if the desk has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/desks")
    @Timed
    public ResponseEntity<Desk> createDesk(@RequestBody Desk desk) throws URISyntaxException {
        log.debug("REST request to save Desk : {}", desk);
        if (desk.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new desk cannot already have an ID")).body(null);
        }
        Desk result = deskService.save(desk);
        return ResponseEntity.created(new URI("/api/desks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /desks : Updates an existing desk.
     *
     * @param desk the desk to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated desk,
     * or with status 400 (Bad Request) if the desk is not valid,
     * or with status 500 (Internal Server Error) if the desk couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/desks")
    @Timed
    public ResponseEntity<Desk> updateDesk(@RequestBody Desk desk) throws URISyntaxException {
        log.debug("REST request to update Desk : {}", desk);
        if (desk.getId() == null) {
            return createDesk(desk);
        }
        Desk result = deskService.save(desk);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, desk.getId().toString()))
            .body(result);
    }

    /**
     * GET  /desks : get all the desks.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of desks in body
     */
    @GetMapping("/desks")
    @Timed
    public ResponseEntity<List<DeskVM>> getAllDesks(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Desks");
        Page<DeskVM> page = deskService.findAll(pageable, "");
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/desks");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /desks/:id : get the "id" desk.
     *
     * @param id the id of the desk to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the desk, or with status 404 (Not Found)
     */
    @GetMapping("/desks/{id}")
    @Timed
    public ResponseEntity<Desk> getDesk(@PathVariable Long id) {
        log.debug("REST request to get Desk : {}", id);
        Desk desk = deskService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(desk));
    }

    /**
     * DELETE  /desks/:id : delete the "id" desk.
     *
     * @param id the id of the desk to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/desks/{id}")
    @Timed
    public ResponseEntity<Void> deleteDesk(@PathVariable Long id) {
        log.debug("REST request to delete Desk : {}", id);
        deskService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/desks?query=:query : search for the desk corresponding
     * to the query.
     *
     * @param query the query of the desk search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/desks")
    @Timed
    public ResponseEntity<List<Desk>> searchDesks(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of Desks for query {}", query);
        Page<Desk> page = deskService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/desks");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
