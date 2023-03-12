package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

public interface QueryRepository extends JpaRepository<com.app.pojos.Query, Long> {
	
	 @Query("SELECT q FROM Query q WHERE q.resolved = :resolved")
	 List<com.app.pojos.Query> findByResolved(@Param("resolved") boolean resolved);
	 
	 List<com.app.pojos.Query> findByUserId(Long userId);
}
