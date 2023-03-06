package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Admin;
import com.app.pojos.Course;

public interface CourseRepository extends JpaRepository<Course,Long> {
	
}
