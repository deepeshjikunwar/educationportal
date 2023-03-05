package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.User;

public interface UserRepository extends JpaRepository<User,Long> {
//Use inherited method : List<User> findAll()
//Use inherited method : User save(User transientUser)
//Use inherited method : void deleteById(Long id)
//Use inherited method : User findById(Long id) : returns Optional with entity in case of id found or returns empty Optional
	User findByEmailAndPassword(String email, String password);


	
}
