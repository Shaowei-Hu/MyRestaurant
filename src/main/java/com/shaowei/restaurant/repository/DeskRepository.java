package com.shaowei.restaurant.repository;

import com.shaowei.restaurant.domain.Desk;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Desk entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeskRepository extends JpaRepository<Desk, Long> {

}
