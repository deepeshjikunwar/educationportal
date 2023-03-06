package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.CourseRepository;
import com.app.dao.UserRepository;
import com.app.dto.UserSignup;
import com.app.exception.EntityNotFound;
import com.app.exception.UserHandlingException;
import com.app.pojos.Course;
import com.app.pojos.User;

@Service
@Transactional
public class UserServiceImpl implements UserService {
//dependency: dao layer i/f
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private CourseRepository courseRepo;
	
	@Override
	public List<User> getAllUsers() {
		//invoke dao's method
		return userRepo.findAll();
	}
	
	@Override
	public String deleteUser(Long userId) {
		userRepo.deleteById(userId);
		return "User details deleted for ID =" + userId;
	}
	@Override
	public User getDetails(Long userId) {
		return userRepo.findById(userId).orElseThrow(()->new UserHandlingException("Invalid User ID"));
	}
	@Override
	public User updateDetails(User detachedUser) {
		return userRepo.save(detachedUser);
	}
	@Override
	public User authenticateUser(String email, String password) {
		return userRepo.findByEmailAndPassword(email, password);
	}
	@Override
	public User addUser(UserSignup transientUser) {
		User user = new User();
		user.setFirstName(transientUser.getFirstName());
		user.setLastName(transientUser.getLastName());
		user.setEmail(transientUser.getEmail());
		user.setPassword(transientUser.getPassword());
		return userRepo.save(user);
	}

	@Override
	public User enrollIntoCourse(Long userId,Long courseId) {
		Course course = courseRepo.findById(courseId).orElseThrow(()-> new EntityNotFound("Course doesn't exist"));
		User user = userRepo.findById(userId).orElseThrow(()-> new EntityNotFound("User doesn't exist"));
		return user.enrollIntoCurrentCourse(course);
	}	
}
