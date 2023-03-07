package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.Course;
import com.app.pojos.User;

public interface UserRepository extends JpaRepository<User,Long> {
//Use inherited method : List<User> findAll()
//Use inherited method : User save(User transientUser)
//Use inherited method : void deleteById(Long id)
//Use inherited method : User findById(Long id) : returns Optional with entity in case of id found or returns empty Optional
	User findByEmailAndPassword(String email, String password);
	
	@Modifying
	@Query("update User u set u.firstName = ?1, u.lastName = ?2, u.email =?3, u.password =?4 where u.id = ?5")
	void setUserInfoById(String firstName,String lastName,String email,String password, Long id);
	
	 List<User> findByEnrolledCourses(Course course);


	
}
