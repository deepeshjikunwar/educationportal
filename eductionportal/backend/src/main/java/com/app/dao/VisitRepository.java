package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Admin;
import com.app.pojos.Visit;

public interface VisitRepository extends JpaRepository<Visit,Long> {
	Visit findByUserIdAndContentId(Long user, Long content);
}
