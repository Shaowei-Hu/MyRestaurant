package com.shaowei.restaurant.repository;

import com.shaowei.restaurant.domain.Accounting;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Accounting entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountingRepository extends JpaRepository<Accounting, Long> {

}
