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
import com.shaowei.restaurant.domain.Ordre;
import com.shaowei.restaurant.service.OrdreService;
import com.shaowei.restaurant.service.dto.OrderDTO;
import com.shaowei.restaurant.web.rest.util.HeaderUtil;
import com.shaowei.restaurant.web.rest.util.PaginationUtil;

import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;

/**
 * REST controller for managing Ordre.
 */
@RestController
@RequestMapping("/api")
public class OrdreResource {

    private final Logger log = LoggerFactory.getLogger(OrdreResource.class);

    private static final String ENTITY_NAME = "ordre";
        
    private final OrdreService ordreService;

    public OrdreResource(OrdreService ordreService) {
        this.ordreService = ordreService;
    }

    /**
     * POST  /ordres : Create a new ordre.
     *
     * @param ordre the ordre to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ordre, or with status 400 (Bad Request) if the ordre has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ordres")
    @Timed
    public ResponseEntity<Ordre> createOrdre(@RequestBody Ordre ordre) throws URISyntaxException {
        log.debug("REST request to save Ordre : {}", ordre);
        if (ordre.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new ordre cannot already have an ID")).body(null);
        }
        Ordre result = ordreService.save(ordre);
        return ResponseEntity.created(new URI("/api/ordres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
    
    /**
     * POST  /ordres : Create an array of new ordre.
     *
     * @param ordres the ordre arrat to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ordres, or with status 400 (Bad Request) if the ordre has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ordreses")
    @Timed
    public ResponseEntity<Ordre[]> createOrdre(@RequestBody OrderDTO[] ordres) throws URISyntaxException {
        log.debug("REST request to save Ordre array : {}", ordres.toString());

        Ordre[] result = ordreService.save(ordres);
        return ResponseEntity.created(new URI("/api/ordreses/++size" + result.length))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.toString()))
            .body(result);
    }


    /**
     * PUT  /ordres : Updates an existing ordre.
     *
     * @param ordre the ordre to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ordre,
     * or with status 400 (Bad Request) if the ordre is not valid,
     * or with status 500 (Internal Server Error) if the ordre couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ordres")
    @Timed
    public ResponseEntity<Ordre> updateOrdre(@RequestBody Ordre ordre) throws URISyntaxException {
        log.debug("REST request to update Ordre : {}", ordre);
        if (ordre.getId() == null) {
            return createOrdre(ordre);
        }
        Ordre result = ordreService.save(ordre);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ordre.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ordres : get all the ordres.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of ordres in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/ordres")
    @Timed
    public ResponseEntity<List<Ordre>> getAllOrdres(@ApiParam Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Ordres");
        Page<Ordre> page = ordreService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/ordres");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /ordres/:id : get the "id" ordre.
     *
     * @param id the id of the ordre to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ordre, or with status 404 (Not Found)
     */
    @GetMapping("/ordres/{id}")
    @Timed
    public ResponseEntity<Ordre> getOrdre(@PathVariable Long id) {
        log.debug("REST request to get Ordre : {}", id);
        Ordre ordre = ordreService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ordre));
    }

    /**
     * DELETE  /ordres/:id : delete the "id" ordre.
     *
     * @param id the id of the ordre to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ordres/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrdre(@PathVariable Long id) {
        log.debug("REST request to delete Ordre : {}", id);
        ordreService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/ordres?query=:query : search for the ordre corresponding
     * to the query.
     *
     * @param query the query of the ordre search 
     * @param pageable the pagination information
     * @return the result of the search
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/_search/ordres")
    @Timed
    public ResponseEntity<List<Ordre>> searchOrdres(@RequestParam String query, @ApiParam Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to search for a page of Ordres for query {}", query);
        Page<Ordre> page = ordreService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/ordres");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


}
