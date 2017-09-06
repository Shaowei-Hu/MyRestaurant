package com.shaowei.restaurant.web.rest;

import com.shaowei.restaurant.MyRestaurantApp;

import com.shaowei.restaurant.domain.Desk;
import com.shaowei.restaurant.repository.DeskRepository;
import com.shaowei.restaurant.service.DeskService;
import com.shaowei.restaurant.repository.search.DeskSearchRepository;
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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DeskResource REST controller.
 *
 * @see DeskResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MyRestaurantApp.class)
public class DeskResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final Integer DEFAULT_CLIENT_NUMBER = 1;
    private static final Integer UPDATED_CLIENT_NUMBER = 2;

    private static final Integer DEFAULT_RANKING = 1;
    private static final Integer UPDATED_RANKING = 2;

    @Autowired
    private DeskRepository deskRepository;

    @Autowired
    private DeskService deskService;

    @Autowired
    private DeskSearchRepository deskSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDeskMockMvc;

    private Desk desk;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DeskResource deskResource = new DeskResource(deskService);
        this.restDeskMockMvc = MockMvcBuilders.standaloneSetup(deskResource)
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
    public static Desk createEntity(EntityManager em) {
        Desk desk = new Desk()
            .name(DEFAULT_NAME)
            .status(DEFAULT_STATUS)
            .clientNumber(DEFAULT_CLIENT_NUMBER)
            .ranking(DEFAULT_RANKING);
        return desk;
    }

    @Before
    public void initTest() {
        deskSearchRepository.deleteAll();
        desk = createEntity(em);
    }

    @Test
    @Transactional
    public void createDesk() throws Exception {
        int databaseSizeBeforeCreate = deskRepository.findAll().size();

        // Create the Desk
        restDeskMockMvc.perform(post("/api/desks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(desk)))
            .andExpect(status().isCreated());

        // Validate the Desk in the database
        List<Desk> deskList = deskRepository.findAll();
        assertThat(deskList).hasSize(databaseSizeBeforeCreate + 1);
        Desk testDesk = deskList.get(deskList.size() - 1);
        assertThat(testDesk.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDesk.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testDesk.getClientNumber()).isEqualTo(DEFAULT_CLIENT_NUMBER);
        assertThat(testDesk.getRanking()).isEqualTo(DEFAULT_RANKING);

        // Validate the Desk in Elasticsearch
        Desk deskEs = deskSearchRepository.findOne(testDesk.getId());
        assertThat(deskEs).isEqualToComparingFieldByField(testDesk);
    }

    @Test
    @Transactional
    public void createDeskWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deskRepository.findAll().size();

        // Create the Desk with an existing ID
        desk.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeskMockMvc.perform(post("/api/desks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(desk)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Desk> deskList = deskRepository.findAll();
        assertThat(deskList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDesks() throws Exception {
        // Initialize the database
        deskRepository.saveAndFlush(desk);

        // Get all the deskList
        restDeskMockMvc.perform(get("/api/desks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(desk.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].clientNumber").value(hasItem(DEFAULT_CLIENT_NUMBER)))
            .andExpect(jsonPath("$.[*].ranking").value(hasItem(DEFAULT_RANKING)));
    }

    @Test
    @Transactional
    public void getDesk() throws Exception {
        // Initialize the database
        deskRepository.saveAndFlush(desk);

        // Get the desk
        restDeskMockMvc.perform(get("/api/desks/{id}", desk.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(desk.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.clientNumber").value(DEFAULT_CLIENT_NUMBER))
            .andExpect(jsonPath("$.ranking").value(DEFAULT_RANKING));
    }

    @Test
    @Transactional
    public void getNonExistingDesk() throws Exception {
        // Get the desk
        restDeskMockMvc.perform(get("/api/desks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDesk() throws Exception {
        // Initialize the database
        deskService.save(desk);

        int databaseSizeBeforeUpdate = deskRepository.findAll().size();

        // Update the desk
        Desk updatedDesk = deskRepository.findOne(desk.getId());
        updatedDesk
            .name(UPDATED_NAME)
            .status(UPDATED_STATUS)
            .clientNumber(UPDATED_CLIENT_NUMBER)
            .ranking(UPDATED_RANKING);

        restDeskMockMvc.perform(put("/api/desks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDesk)))
            .andExpect(status().isOk());

        // Validate the Desk in the database
        List<Desk> deskList = deskRepository.findAll();
        assertThat(deskList).hasSize(databaseSizeBeforeUpdate);
        Desk testDesk = deskList.get(deskList.size() - 1);
        assertThat(testDesk.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDesk.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testDesk.getClientNumber()).isEqualTo(UPDATED_CLIENT_NUMBER);
        assertThat(testDesk.getRanking()).isEqualTo(UPDATED_RANKING);

        // Validate the Desk in Elasticsearch
        Desk deskEs = deskSearchRepository.findOne(testDesk.getId());
        assertThat(deskEs).isEqualToComparingFieldByField(testDesk);
    }

    @Test
    @Transactional
    public void updateNonExistingDesk() throws Exception {
        int databaseSizeBeforeUpdate = deskRepository.findAll().size();

        // Create the Desk

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDeskMockMvc.perform(put("/api/desks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(desk)))
            .andExpect(status().isCreated());

        // Validate the Desk in the database
        List<Desk> deskList = deskRepository.findAll();
        assertThat(deskList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDesk() throws Exception {
        // Initialize the database
        deskService.save(desk);

        int databaseSizeBeforeDelete = deskRepository.findAll().size();

        // Get the desk
        restDeskMockMvc.perform(delete("/api/desks/{id}", desk.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean deskExistsInEs = deskSearchRepository.exists(desk.getId());
        assertThat(deskExistsInEs).isFalse();

        // Validate the database is empty
        List<Desk> deskList = deskRepository.findAll();
        assertThat(deskList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchDesk() throws Exception {
        // Initialize the database
        deskService.save(desk);

        // Search the desk
        restDeskMockMvc.perform(get("/api/_search/desks?query=id:" + desk.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(desk.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].clientNumber").value(hasItem(DEFAULT_CLIENT_NUMBER)))
            .andExpect(jsonPath("$.[*].ranking").value(hasItem(DEFAULT_RANKING)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Desk.class);
        Desk desk1 = new Desk();
        desk1.setId(1L);
        Desk desk2 = new Desk();
        desk2.setId(desk1.getId());
        assertThat(desk1).isEqualTo(desk2);
        desk2.setId(2L);
        assertThat(desk1).isNotEqualTo(desk2);
        desk1.setId(null);
        assertThat(desk1).isNotEqualTo(desk2);
    }
}
