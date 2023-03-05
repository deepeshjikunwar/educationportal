package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.UserRepository;
import com.app.exception.UserHandlingException;
import com.app.pojos.User;

@Service
@Transactional
public class UserServiceImpl implements UserService {
//dependency: dao layer i/f
	@Autowired
	private UserRepository userRepo;
	@Override
	public List<User> getAllUsers() {
		//invoke dao's method
		return userRepo.findAll();
	}
	@Override
	public User addUser(User user) {
		return userRepo.save(user);
	}
	@Override
	public String deleteUser(Long userId) {
		userRepo.deleteById(userId);
		return "User details deleted for ID =" + userId;
	}
	@Override
	public User getDetails(Long userID) {
		return userRepo.findById(userID).orElseThrow(()->new UserHandlingException("Invalid User ID"));
	}
	@Override
	public User updateDetails(User detachedUser) {
		return userRepo.save(detachedUser);
	}	
}
