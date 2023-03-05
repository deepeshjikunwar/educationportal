package com.app.service;

import java.util.List;

import com.app.dto.UserSignup;
import com.app.pojos.User;

public interface UserService {
	User authenticateUser(String email, String password);
	User addUser(UserSignup transientAdmin);
	
	List<User> getAllUsers();
	User getDetails(Long userID);
	String deleteUser(Long userId);
	User updateDetails(User detachedUser);
	
}
