package com.shaowei.restaurant.web.rest;

import com.shaowei.restaurant.MyRestaurantApp;

import com.shaowei.restaurant.domain.Stage;
import com.shaowei.restaurant.repository.StageRepository;
import com.shaowei.restaurant.service.StageService;
import com.shaowei.restaurant.repository.search.StageSearchRepository;
import com.shaowei.restaurant.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.shaowei.restaurant.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the StageResource REST controller.
 *
 * @see StageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MyRestaurantApp.class)
public class StageResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final Integer DEFAULT_CLIENT_NUMBER = 1;
    private static final Integer UPDATED_CLIENT_NUMBER = 2;

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(2);

    private static final BigDecimal DEFAULT_AMOUNT_PAID = new BigDecimal(1);
    private static final BigDecimal UPDATED_AMOUNT_PAID = new BigDecimal(2);

    private static final ZonedDateTime DEFAULT_CREATION_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATION_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private StageRepository stageRepository;

    @Autowired
    private StageService stageService;

    @Autowired
    private StageSearchRepository stageSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStageMockMvc;

    private Stage stage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StageResource stageResource = new StageResource(stageService);
        this.restStageMockMvc = MockMvcBuilders.standaloneSetup(stageResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Stage createEntity(EntityManager em) {
        Stage stage = new Stage()
            .name(DEFAULT_NAME)
            .status(DEFAULT_STATUS)
            .clientNumber(DEFAULT_CLIENT_NUMBER)
            .amount(DEFAULT_AMOUNT)
            .amountPaid(DEFAULT_AMOUNT_PAID)
            .creationDate(DEFAULT_CREATION_DATE);
        return stage;
    }

    @Before
    public void initTest() {
        stageSearchRepository.deleteAll();
        stage = createEntity(em);
    }

    @Test
    @Transactional
    public void createStage() throws Exception {
        int databaseSizeBeforeCreate = stageRepository.findAll().size();

        // Create the Stage
        restStageMockMvc.perform(post("/api/stages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stage)))
            .andExpect(status().isCreated());

        // Validate the Stage in the database
        List<Stage> stageList = stageRepository.findAll();
        assertThat(stageList).hasSize(databaseSizeBeforeCreate + 1);
        Stage testStage = stageList.get(stageList.size() - 1);
        assertThat(testStage.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testStage.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testStage.getClientNumber()).isEqualTo(DEFAULT_CLIENT_NUMBER);
        assertThat(testStage.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testStage.getAmountPaid()).isEqualTo(DEFAULT_AMOUNT_PAID);
        assertThat(testStage.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);

        // Validate the Stage in Elasticsearch
        Stage stageEs = stageSearchRepository.findOne(testStage.getId());
        assertThat(stageEs).isEqualToComparingFieldByField(testStage);
    }

    @Test
    @Transactional
    public void createStageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stageRepository.findAll().size();

        // Create the Stage with an existing ID
        stage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStageMockMvc.perform(post("/api/stages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stage)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Stage> stageList = stageRepository.findAll();
        assertThat(stageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStages() throws Exception {
        // Initialize the database
        stageRepository.saveAndFlush(stage);

        // Get all the stageList
        restStageMockMvc.perform(get("/api/stages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stage.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].clientNumber").value(hasItem(DEFAULT_CLIENT_NUMBER)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].amountPaid").value(hasItem(DEFAULT_AMOUNT_PAID.intValue())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(sameInstant(DEFAULT_CREATION_DATE))));
    }

    @Test
    @Transactional
    public void getStage() throws Exception {
        // Initialize the database
        stageRepository.saveAndFlush(stage);

        // Get the stage
        restStageMockMvc.perform(get("/api/stages/{id}", stage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stage.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.clientNumber").value(DEFAULT_CLIENT_NUMBER))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.amountPaid").value(DEFAULT_AMOUNT_PAID.intValue()))
            .andExpect(jsonPath("$.creationDate").value(sameInstant(DEFAULT_CREATION_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingStage() throws Exception {
        // Get the stage
        restStageMockMvc.perform(get("/api/stages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStage() throws Exception {
        // Initialize the database
        stageService.save(stage);

        int databaseSizeBeforeUpdate = stageRepository.findAll().size();

        // Update the stage
        Stage updatedStage = stageRepository.findOne(stage.getId());
        updatedStage
            .name(UPDATED_NAME)
            .status(UPDATED_STATUS)
            .clientNumber(UPDATED_CLIENT_NUMBER)
            .amount(UPDATED_AMOUNT)
            .amountPaid(UPDATED_AMOUNT_PAID)
            .creationDate(UPDATED_CREATION_DATE);

        restStageMockMvc.perform(put("/api/stages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStage)))
            .andExpect(status().isOk());

        // Validate the Stage in the database
        List<Stage> stageList = stageRepository.findAll();
        assertThat(stageList).hasSize(databaseSizeBeforeUpdate);
        Stage testStage = stageList.get(stageList.size() - 1);
        assertThat(testStage.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testStage.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testStage.getClientNumber()).isEqualTo(UPDATED_CLIENT_NUMBER);
        assertThat(testStage.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testStage.getAmountPaid()).isEqualTo(UPDATED_AMOUNT_PAID);
        assertThat(testStage.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);

        // Validate the Stage in Elasticsearch
        Stage stageEs = stageSearchRepository.findOne(testStage.getId());
        assertThat(stageEs).isEqualToComparingFieldByField(testStage);
    }

    @Test
    @Transactional
    public void updateNonExistingStage() throws Exception {
        int databaseSizeBeforeUpdate = stageRepository.findAll().size();

        // Create the Stage

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStageMockMvc.perform(put("/api/stages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stage)))
            .andExpect(status().isCreated());

        // Validate the Stage in the database
        List<Stage> stageList = stageRepository.findAll();
        assertThat(stageList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteStage() throws Exception {
        // Initialize the database
        stageService.save(stage);

        int databaseSizeBeforeDelete = stageRepository.findAll().size();

        // Get the stage
        restStageMockMvc.perform(delete("/api/stages/{id}", stage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean stageExistsInEs = stageSearchRepository.exists(stage.getId());
        assertThat(stageExistsInEs).isFalse();

        // Validate the database is empty
        List<Stage> stageList = stageRepository.findAll();
        assertThat(stageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchStage() throws Exception {
        // Initialize the database
        stageService.save(stage);

        // Search the stage
        restStageMockMvc.perform(get("/api/_search/stages?query=id:" + stage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stage.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].clientNumber").value(hasItem(DEFAULT_CLIENT_NUMBER)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].amountPaid").value(hasItem(DEFAULT_AMOUNT_PAID.intValue())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(sameInstant(DEFAULT_CREATION_DATE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Stage.class);
        Stage stage1 = new Stage();
        stage1.setId(1L);
        Stage stage2 = new Stage();
        stage2.setId(stage1.getId());
        assertThat(stage1).isEqualTo(stage2);
        stage2.setId(2L);
        assertThat(stage1).isNotEqualTo(stage2);
        stage1.setId(null);
        assertThat(stage1).isNotEqualTo(stage2);
    }
}
