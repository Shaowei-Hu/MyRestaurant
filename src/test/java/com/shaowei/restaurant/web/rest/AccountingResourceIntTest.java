package com.shaowei.restaurant.web.rest;

import com.shaowei.restaurant.MyRestaurantApp;

import com.shaowei.restaurant.domain.Accounting;
import com.shaowei.restaurant.repository.AccountingRepository;
import com.shaowei.restaurant.service.AccountingService;
import com.shaowei.restaurant.repository.search.AccountingSearchRepository;
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

import com.shaowei.restaurant.domain.enumeration.AccountingType;
/**
 * Test class for the AccountingResource REST controller.
 *
 * @see AccountingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MyRestaurantApp.class)
public class AccountingResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final AccountingType DEFAULT_TYPE = AccountingType.HALF;
    private static final AccountingType UPDATED_TYPE = AccountingType.DIARY;

    private static final String DEFAULT_INFO = "AAAAAAAAAA";
    private static final String UPDATED_INFO = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_START_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_END_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_END_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final BigDecimal DEFAULT_CARD = new BigDecimal(1);
    private static final BigDecimal UPDATED_CARD = new BigDecimal(2);

    private static final BigDecimal DEFAULT_CASH = new BigDecimal(1);
    private static final BigDecimal UPDATED_CASH = new BigDecimal(2);

    private static final BigDecimal DEFAULT_CHECK = new BigDecimal(1);
    private static final BigDecimal UPDATED_CHECK = new BigDecimal(2);

    private static final BigDecimal DEFAULT_TICKET = new BigDecimal(1);
    private static final BigDecimal UPDATED_TICKET = new BigDecimal(2);

    private static final BigDecimal DEFAULT_OTHER = new BigDecimal(1);
    private static final BigDecimal UPDATED_OTHER = new BigDecimal(2);

    private static final BigDecimal DEFAULT_TOTAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_TOTAL = new BigDecimal(2);

    private static final ZonedDateTime DEFAULT_CREATION_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATION_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private AccountingRepository accountingRepository;

    @Autowired
    private AccountingService accountingService;

    @Autowired
    private AccountingSearchRepository accountingSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAccountingMockMvc;

    private Accounting accounting;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AccountingResource accountingResource = new AccountingResource(accountingService);
        this.restAccountingMockMvc = MockMvcBuilders.standaloneSetup(accountingResource)
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
    public static Accounting createEntity(EntityManager em) {
        Accounting accounting = new Accounting()
            .name(DEFAULT_NAME)
            .type(DEFAULT_TYPE)
            .info(DEFAULT_INFO)
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME)
            .card(DEFAULT_CARD)
            .cash(DEFAULT_CASH)
            .check(DEFAULT_CHECK)
            .ticket(DEFAULT_TICKET)
            .other(DEFAULT_OTHER)
            .total(DEFAULT_TOTAL)
            .creationDate(DEFAULT_CREATION_DATE);
        return accounting;
    }

    @Before
    public void initTest() {
        accountingSearchRepository.deleteAll();
        accounting = createEntity(em);
    }

    @Test
    @Transactional
    public void createAccounting() throws Exception {
        int databaseSizeBeforeCreate = accountingRepository.findAll().size();

        // Create the Accounting
        restAccountingMockMvc.perform(post("/api/accountings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accounting)))
            .andExpect(status().isCreated());

        // Validate the Accounting in the database
        List<Accounting> accountingList = accountingRepository.findAll();
        assertThat(accountingList).hasSize(databaseSizeBeforeCreate + 1);
        Accounting testAccounting = accountingList.get(accountingList.size() - 1);
        assertThat(testAccounting.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAccounting.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testAccounting.getInfo()).isEqualTo(DEFAULT_INFO);
        assertThat(testAccounting.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testAccounting.getEndTime()).isEqualTo(DEFAULT_END_TIME);
        assertThat(testAccounting.getCard()).isEqualTo(DEFAULT_CARD);
        assertThat(testAccounting.getCash()).isEqualTo(DEFAULT_CASH);
        assertThat(testAccounting.getCheck()).isEqualTo(DEFAULT_CHECK);
        assertThat(testAccounting.getTicket()).isEqualTo(DEFAULT_TICKET);
        assertThat(testAccounting.getOther()).isEqualTo(DEFAULT_OTHER);
        assertThat(testAccounting.getTotal()).isEqualTo(DEFAULT_TOTAL);
        assertThat(testAccounting.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);

        // Validate the Accounting in Elasticsearch
        Accounting accountingEs = accountingSearchRepository.findOne(testAccounting.getId());
        assertThat(accountingEs).isEqualToComparingFieldByField(testAccounting);
    }

    @Test
    @Transactional
    public void createAccountingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = accountingRepository.findAll().size();

        // Create the Accounting with an existing ID
        accounting.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccountingMockMvc.perform(post("/api/accountings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accounting)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Accounting> accountingList = accountingRepository.findAll();
        assertThat(accountingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAccountings() throws Exception {
        // Initialize the database
        accountingRepository.saveAndFlush(accounting);

        // Get all the accountingList
        restAccountingMockMvc.perform(get("/api/accountings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accounting.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].info").value(hasItem(DEFAULT_INFO.toString())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(sameInstant(DEFAULT_START_TIME))))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(sameInstant(DEFAULT_END_TIME))))
            .andExpect(jsonPath("$.[*].card").value(hasItem(DEFAULT_CARD.intValue())))
            .andExpect(jsonPath("$.[*].cash").value(hasItem(DEFAULT_CASH.intValue())))
            .andExpect(jsonPath("$.[*].check").value(hasItem(DEFAULT_CHECK.intValue())))
            .andExpect(jsonPath("$.[*].ticket").value(hasItem(DEFAULT_TICKET.intValue())))
            .andExpect(jsonPath("$.[*].other").value(hasItem(DEFAULT_OTHER.intValue())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.intValue())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(sameInstant(DEFAULT_CREATION_DATE))));
    }

    @Test
    @Transactional
    public void getAccounting() throws Exception {
        // Initialize the database
        accountingRepository.saveAndFlush(accounting);

        // Get the accounting
        restAccountingMockMvc.perform(get("/api/accountings/{id}", accounting.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(accounting.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.info").value(DEFAULT_INFO.toString()))
            .andExpect(jsonPath("$.startTime").value(sameInstant(DEFAULT_START_TIME)))
            .andExpect(jsonPath("$.endTime").value(sameInstant(DEFAULT_END_TIME)))
            .andExpect(jsonPath("$.card").value(DEFAULT_CARD.intValue()))
            .andExpect(jsonPath("$.cash").value(DEFAULT_CASH.intValue()))
            .andExpect(jsonPath("$.check").value(DEFAULT_CHECK.intValue()))
            .andExpect(jsonPath("$.ticket").value(DEFAULT_TICKET.intValue()))
            .andExpect(jsonPath("$.other").value(DEFAULT_OTHER.intValue()))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.intValue()))
            .andExpect(jsonPath("$.creationDate").value(sameInstant(DEFAULT_CREATION_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingAccounting() throws Exception {
        // Get the accounting
        restAccountingMockMvc.perform(get("/api/accountings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAccounting() throws Exception {
        // Initialize the database
        accountingService.save(accounting);

        int databaseSizeBeforeUpdate = accountingRepository.findAll().size();

        // Update the accounting
        Accounting updatedAccounting = accountingRepository.findOne(accounting.getId());
        updatedAccounting
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE)
            .info(UPDATED_INFO)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .card(UPDATED_CARD)
            .cash(UPDATED_CASH)
            .check(UPDATED_CHECK)
            .ticket(UPDATED_TICKET)
            .other(UPDATED_OTHER)
            .total(UPDATED_TOTAL)
            .creationDate(UPDATED_CREATION_DATE);

        restAccountingMockMvc.perform(put("/api/accountings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAccounting)))
            .andExpect(status().isOk());

        // Validate the Accounting in the database
        List<Accounting> accountingList = accountingRepository.findAll();
        assertThat(accountingList).hasSize(databaseSizeBeforeUpdate);
        Accounting testAccounting = accountingList.get(accountingList.size() - 1);
        assertThat(testAccounting.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAccounting.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testAccounting.getInfo()).isEqualTo(UPDATED_INFO);
        assertThat(testAccounting.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testAccounting.getEndTime()).isEqualTo(UPDATED_END_TIME);
        assertThat(testAccounting.getCard()).isEqualTo(UPDATED_CARD);
        assertThat(testAccounting.getCash()).isEqualTo(UPDATED_CASH);
        assertThat(testAccounting.getCheck()).isEqualTo(UPDATED_CHECK);
        assertThat(testAccounting.getTicket()).isEqualTo(UPDATED_TICKET);
        assertThat(testAccounting.getOther()).isEqualTo(UPDATED_OTHER);
        assertThat(testAccounting.getTotal()).isEqualTo(UPDATED_TOTAL);
        assertThat(testAccounting.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);

        // Validate the Accounting in Elasticsearch
        Accounting accountingEs = accountingSearchRepository.findOne(testAccounting.getId());
        assertThat(accountingEs).isEqualToComparingFieldByField(testAccounting);
    }

    @Test
    @Transactional
    public void updateNonExistingAccounting() throws Exception {
        int databaseSizeBeforeUpdate = accountingRepository.findAll().size();

        // Create the Accounting

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAccountingMockMvc.perform(put("/api/accountings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accounting)))
            .andExpect(status().isCreated());

        // Validate the Accounting in the database
        List<Accounting> accountingList = accountingRepository.findAll();
        assertThat(accountingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAccounting() throws Exception {
        // Initialize the database
        accountingService.save(accounting);

        int databaseSizeBeforeDelete = accountingRepository.findAll().size();

        // Get the accounting
        restAccountingMockMvc.perform(delete("/api/accountings/{id}", accounting.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean accountingExistsInEs = accountingSearchRepository.exists(accounting.getId());
        assertThat(accountingExistsInEs).isFalse();

        // Validate the database is empty
        List<Accounting> accountingList = accountingRepository.findAll();
        assertThat(accountingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchAccounting() throws Exception {
        // Initialize the database
        accountingService.save(accounting);

        // Search the accounting
        restAccountingMockMvc.perform(get("/api/_search/accountings?query=id:" + accounting.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accounting.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].info").value(hasItem(DEFAULT_INFO.toString())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(sameInstant(DEFAULT_START_TIME))))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(sameInstant(DEFAULT_END_TIME))))
            .andExpect(jsonPath("$.[*].card").value(hasItem(DEFAULT_CARD.intValue())))
            .andExpect(jsonPath("$.[*].cash").value(hasItem(DEFAULT_CASH.intValue())))
            .andExpect(jsonPath("$.[*].check").value(hasItem(DEFAULT_CHECK.intValue())))
            .andExpect(jsonPath("$.[*].ticket").value(hasItem(DEFAULT_TICKET.intValue())))
            .andExpect(jsonPath("$.[*].other").value(hasItem(DEFAULT_OTHER.intValue())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.intValue())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(sameInstant(DEFAULT_CREATION_DATE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Accounting.class);
        Accounting accounting1 = new Accounting();
        accounting1.setId(1L);
        Accounting accounting2 = new Accounting();
        accounting2.setId(accounting1.getId());
        assertThat(accounting1).isEqualTo(accounting2);
        accounting2.setId(2L);
        assertThat(accounting1).isNotEqualTo(accounting2);
        accounting1.setId(null);
        assertThat(accounting1).isNotEqualTo(accounting2);
    }
}
