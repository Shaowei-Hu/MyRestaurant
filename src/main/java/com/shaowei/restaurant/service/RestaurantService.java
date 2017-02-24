package com.shaowei.restaurant.service;

import com.shaowei.restaurant.domain.Restaurant;
import com.shaowei.restaurant.repository.RestaurantRepository;
import com.shaowei.restaurant.repository.search.RestaurantSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Restaurant.
 */
@Service
@Transactional
public class RestaurantService {

    private final Logger log = LoggerFactory.getLogger(RestaurantService.class);
    
    private final RestaurantRepository restaurantRepository;

    private final RestaurantSearchRepository restaurantSearchRepository;

    public RestaurantService(RestaurantRepository restaurantRepository, RestaurantSearchRepository restaurantSearchRepository) {
        this.restaurantRepository = restaurantRepository;
        this.restaurantSearchRepository = restaurantSearchRepository;
    }

    /**
     * Save a restaurant.
     *
     * @param restaurant the entity to save
     * @return the persisted entity
     */
    public Restaurant save(Restaurant restaurant) {
        log.debug("Request to save Restaurant : {}", restaurant);
        Restaurant result = restaurantRepository.save(restaurant);
        restaurantSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the restaurants.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Restaurant> findAll() {
        log.debug("Request to get all Restaurants");
        List<Restaurant> result = restaurantRepository.findAll();

        return result;
    }

    /**
     *  Get one restaurant by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Restaurant findOne(Long id) {
        log.debug("Request to get Restaurant : {}", id);
        Restaurant restaurant = restaurantRepository.findOne(id);
        return restaurant;
    }

    /**
     *  Delete the  restaurant by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Restaurant : {}", id);
        restaurantRepository.delete(id);
        restaurantSearchRepository.delete(id);
    }

    /**
     * Search for the restaurant corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Restaurant> search(String query) {
        log.debug("Request to search Restaurants for query {}", query);
        return StreamSupport
            .stream(restaurantSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
