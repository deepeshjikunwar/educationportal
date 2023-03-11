package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.Admin;
import com.app.pojos.Course;
import com.app.pojos.User;

public interface CourseRepository extends JpaRepository<Course,Long> {
	List<Course> findAllCoursesByAdminId(Long adminId);

	//	@EntityGraph(value = "course.withContentsAndAssignments", type = EntityGraphType.FETCH)
	//	List<Course> findAll();

	@Modifying
	@Query("UPDATE Course c SET c.enrolledUsers = :enrolledUsers, c.countUser = :countUser WHERE c.id = :courseId")
	void deleteStudentFromCourse(@Param("courseId") Long courseId, @Param("enrolledUsers") List<User> enrolledUsers, @Param("countUser") int countUser);
	
	@Query("SELECT c FROM Course c LEFT JOIN FETCH c.assignments WHERE c.id = :courseId")
    Course findCourseById(@Param("courseId") Long courseId);
}
