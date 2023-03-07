package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Admin;
import com.app.pojos.Course;

public interface CourseRepository extends JpaRepository<Course,Long> {
	List<Course> findAllCoursesByAdminId(Long adminId);
}
