package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.Admin;
import com.app.pojos.Course;

public interface CourseRepository extends JpaRepository<Course,Long> {
	List<Course> findAllCoursesByAdminId(Long adminId);
	
//	@EntityGraph(value = "course.withContentsAndAssignments", type = EntityGraphType.FETCH)
//	List<Course> findAll();
}
