package com.app.service;

import java.util.List;

import com.app.dto.UserSignup;
import com.app.pojos.User;

public interface UserService {
	User authenticateUser(String email, String password);
	User addUser(UserSignup transientAdmin);
	
	List<User> getAllUsers();
	User getDetails(Long userId);
	String deleteUser(Long userId);
	String updateDetails(User existingUserUser,UserSignup transientUser);
	
	User enrollIntoCourse(Long userId,Long courseId);
	
}
