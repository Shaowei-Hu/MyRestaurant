package com.shaowei.restaurant.repository;

import com.shaowei.restaurant.domain.Ordre;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Ordre entity.
 */
@SuppressWarnings("unused")
public interface OrdreRepository extends JpaRepository<Ordre,Long> {

}
