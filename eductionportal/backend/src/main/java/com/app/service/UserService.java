package com.app.service;

import java.util.List;

import com.app.pojos.User;

public interface UserService {
	List<User> getAllUsers();
	User addUser(User user);
	User getDetails(Long userID);
	String deleteUser(Long userId);
	User updateDetails(User detachedUser);
}
