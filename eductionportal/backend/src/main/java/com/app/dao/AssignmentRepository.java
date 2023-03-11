package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.Admin;
import com.app.pojos.Assignment;
import com.app.pojos.Content;
import com.app.pojos.Course;

public interface AssignmentRepository extends JpaRepository<Assignment,Long> {
	List<Assignment> findAllAssignmentByCourseId(Long courseId);
	
	@Query("SELECT a FROM Assignment a WHERE a.id = :assignmentId")
    Assignment findAssignmentById(@Param("assignmentId") Long assignmentId);
}
