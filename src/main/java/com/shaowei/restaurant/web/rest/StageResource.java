package com.shaowei.restaurant.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.shaowei.restaurant.domain.Stage;
import com.shaowei.restaurant.service.StageService;
import com.shaowei.restaurant.web.rest.util.HeaderUtil;
import com.shaowei.restaurant.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Stage.
 */
@RestController
@RequestMapping("/api")
public class StageResource {

    private final Logger log = LoggerFactory.getLogger(StageResource.class);

    private static final String ENTITY_NAME = "stage";

    private final StageService stageService;

    public StageResource(StageService stageService) {
        this.stageService = stageService;
    }

    /**
     * POST  /stages : Create a new stage.
     *
     * @param stage the stage to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stage, or with status 400 (Bad Request) if the stage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stages")
    @Timed
    public ResponseEntity<Stage> createStage(@RequestBody Stage stage) throws URISyntaxException {
        log.debug("REST request to save Stage : {}", stage);
        if (stage.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new stage cannot already have an ID")).body(null);
        }
        Stage result = stageService.save(stage);
        return ResponseEntity.created(new URI("/api/stages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stages : Updates an existing stage.
     *
     * @param stage the stage to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stage,
     * or with status 400 (Bad Request) if the stage is not valid,
     * or with status 500 (Internal Server Error) if the stage couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stages")
    @Timed
    public ResponseEntity<Stage> updateStage(@RequestBody Stage stage) throws URISyntaxException {
        log.debug("REST request to update Stage : {}", stage);
        if (stage.getId() == null) {
            return createStage(stage);
        }
        Stage result = stageService.save(stage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stage.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stages : get all the stages.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of stages in body
     */
    @GetMapping("/stages")
    @Timed
    public ResponseEntity<List<Stage>> getAllStages(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Stages");
        Page<Stage> page = stageService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/stages");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /stages/:id : get the "id" stage.
     *
     * @param id the id of the stage to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stage, or with status 404 (Not Found)
     */
    @GetMapping("/stages/{id}")
    @Timed
    public ResponseEntity<Stage> getStage(@PathVariable Long id) {
        log.debug("REST request to get Stage : {}", id);
        Stage stage = stageService.findOneEager(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(stage));
    }

    /**
     * DELETE  /stages/:id : delete the "id" stage.
     *
     * @param id the id of the stage to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stages/{id}")
    @Timed
    public ResponseEntity<Void> deleteStage(@PathVariable Long id) {
        log.debug("REST request to delete Stage : {}", id);
        stageService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/stages?query=:query : search for the stage corresponding
     * to the query.
     *
     * @param query the query of the stage search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/stages")
    @Timed
    public ResponseEntity<List<Stage>> searchStages(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of Stages for query {}", query);
        Page<Stage> page = stageService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/stages");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
