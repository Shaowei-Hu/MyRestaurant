package com.shaowei.restaurant.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shaowei.restaurant.domain.Category;
import com.shaowei.restaurant.domain.Product;
import com.shaowei.restaurant.repository.ProductRepository;
import com.shaowei.restaurant.repository.search.ProductSearchRepository;
import com.shaowei.restaurant.service.CategoryService;
import com.shaowei.restaurant.service.ProductService;

/**
 * Service Implementation for managing Product.
 */
@Service
@Transactional
public class ProductServiceImpl implements ProductService{

    private final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

    private final ProductRepository productRepository;
    
    private final CategoryService categoryService;

    private final ProductSearchRepository productSearchRepository;
    public ProductServiceImpl(ProductRepository productRepository, ProductSearchRepository productSearchRepository,
    		CategoryService categoryService) {
        this.productRepository = productRepository;
        this.productSearchRepository = productSearchRepository;
        this.categoryService = categoryService;
    }

    /**
     * Save a product.
     *
     * @param product the entity to save
     * @return the persisted entity
     */
    @Override
    public Product save(Product product) {
        log.debug("Request to save Product : {}", product);
        if(product.getCategory() != null) {
        	Category category = categoryService.findOne(product.getCategory().getId());
        	category.addProduct(product);
        	categoryService.save(category);
        }
        Product result = productRepository.save(product);
        productSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the products.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Product> findAll() {
        log.debug("Request to get all Products");
        return productRepository.findAll();
    }

    /**
     *  Get one product by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Product findOne(Long id) {
        log.debug("Request to get Product : {}", id);
        return productRepository.findOne(id);
    }

    /**
     *  Delete the  product by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Product : {}", id);
        productRepository.delete(id);
        productSearchRepository.delete(id);
    }

    /**
     * Search for the product corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Product> search(String query) {
        log.debug("Request to search Products for query {}", query);
        return StreamSupport
            .stream(productSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
