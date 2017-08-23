package com.shaowei.restaurant.web.rest;

import com.shaowei.restaurant.MyRestaurantApp;

import com.shaowei.restaurant.domain.Ordre;
import com.shaowei.restaurant.repository.OrdreRepository;
import com.shaowei.restaurant.service.OrdreService;
import com.shaowei.restaurant.repository.search.OrdreSearchRepository;
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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the OrdreResource REST controller.
 *
 * @see OrdreResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MyRestaurantApp.class)
public class OrdreResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRICE = new BigDecimal(2);

    @Autowired
    private OrdreRepository ordreRepository;

    @Autowired
    private OrdreService ordreService;

    @Autowired
    private OrdreSearchRepository ordreSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrdreMockMvc;

    private Ordre ordre;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrdreResource ordreResource = new OrdreResource(ordreService);
        this.restOrdreMockMvc = MockMvcBuilders.standaloneSetup(ordreResource)
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
    public static Ordre createEntity(EntityManager em) {
        Ordre ordre = new Ordre()
            .name(DEFAULT_NAME)
            .status(DEFAULT_STATUS)
            .price(DEFAULT_PRICE);
        return ordre;
    }

    @Before
    public void initTest() {
        ordreSearchRepository.deleteAll();
        ordre = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrdre() throws Exception {
        int databaseSizeBeforeCreate = ordreRepository.findAll().size();

        // Create the Ordre
        restOrdreMockMvc.perform(post("/api/ordres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordre)))
            .andExpect(status().isCreated());

        // Validate the Ordre in the database
        List<Ordre> ordreList = ordreRepository.findAll();
        assertThat(ordreList).hasSize(databaseSizeBeforeCreate + 1);
        Ordre testOrdre = ordreList.get(ordreList.size() - 1);
        assertThat(testOrdre.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOrdre.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testOrdre.getPrice()).isEqualTo(DEFAULT_PRICE);

        // Validate the Ordre in Elasticsearch
        Ordre ordreEs = ordreSearchRepository.findOne(testOrdre.getId());
        assertThat(ordreEs).isEqualToComparingFieldByField(testOrdre);
    }

    @Test
    @Transactional
    public void createOrdreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ordreRepository.findAll().size();

        // Create the Ordre with an existing ID
        ordre.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrdreMockMvc.perform(post("/api/ordres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordre)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Ordre> ordreList = ordreRepository.findAll();
        assertThat(ordreList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOrdres() throws Exception {
        // Initialize the database
        ordreRepository.saveAndFlush(ordre);

        // Get all the ordreList
        restOrdreMockMvc.perform(get("/api/ordres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ordre.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())));
    }

    @Test
    @Transactional
    public void getOrdre() throws Exception {
        // Initialize the database
        ordreRepository.saveAndFlush(ordre);

        // Get the ordre
        restOrdreMockMvc.perform(get("/api/ordres/{id}", ordre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ordre.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingOrdre() throws Exception {
        // Get the ordre
        restOrdreMockMvc.perform(get("/api/ordres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrdre() throws Exception {
        // Initialize the database
        ordreService.save(ordre);

        int databaseSizeBeforeUpdate = ordreRepository.findAll().size();

        // Update the ordre
        Ordre updatedOrdre = ordreRepository.findOne(ordre.getId());
        updatedOrdre
            .name(UPDATED_NAME)
            .status(UPDATED_STATUS)
            .price(UPDATED_PRICE);

        restOrdreMockMvc.perform(put("/api/ordres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrdre)))
            .andExpect(status().isOk());

        // Validate the Ordre in the database
        List<Ordre> ordreList = ordreRepository.findAll();
        assertThat(ordreList).hasSize(databaseSizeBeforeUpdate);
        Ordre testOrdre = ordreList.get(ordreList.size() - 1);
        assertThat(testOrdre.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOrdre.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testOrdre.getPrice()).isEqualTo(UPDATED_PRICE);

        // Validate the Ordre in Elasticsearch
        Ordre ordreEs = ordreSearchRepository.findOne(testOrdre.getId());
        assertThat(ordreEs).isEqualToComparingFieldByField(testOrdre);
    }

    @Test
    @Transactional
    public void updateNonExistingOrdre() throws Exception {
        int databaseSizeBeforeUpdate = ordreRepository.findAll().size();

        // Create the Ordre

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrdreMockMvc.perform(put("/api/ordres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordre)))
            .andExpect(status().isCreated());

        // Validate the Ordre in the database
        List<Ordre> ordreList = ordreRepository.findAll();
        assertThat(ordreList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOrdre() throws Exception {
        // Initialize the database
        ordreService.save(ordre);

        int databaseSizeBeforeDelete = ordreRepository.findAll().size();

        // Get the ordre
        restOrdreMockMvc.perform(delete("/api/ordres/{id}", ordre.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean ordreExistsInEs = ordreSearchRepository.exists(ordre.getId());
        assertThat(ordreExistsInEs).isFalse();

        // Validate the database is empty
        List<Ordre> ordreList = ordreRepository.findAll();
        assertThat(ordreList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchOrdre() throws Exception {
        // Initialize the database
        ordreService.save(ordre);

        // Search the ordre
        restOrdreMockMvc.perform(get("/api/_search/ordres?query=id:" + ordre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ordre.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ordre.class);
        Ordre ordre1 = new Ordre();
        ordre1.setId(1L);
        Ordre ordre2 = new Ordre();
        ordre2.setId(ordre1.getId());
        assertThat(ordre1).isEqualTo(ordre2);
        ordre2.setId(2L);
        assertThat(ordre1).isNotEqualTo(ordre2);
        ordre1.setId(null);
        assertThat(ordre1).isNotEqualTo(ordre2);
    }
}
