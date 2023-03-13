package com.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.CourseRepository;
import com.app.dao.UserRepository;
import com.app.dao.VisitRepository;
import com.app.dto.UserSignup;
import com.app.exception.EntityNotFound;
import com.app.exception.UserHandlingException;
import com.app.pojos.Content;
import com.app.pojos.Course;
import com.app.pojos.User;
import com.app.pojos.Visit;

@Service
@Transactional
public class UserServiceImpl implements UserService {
//dependency: dao layer i/f
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private CourseRepository courseRepo;
	@Autowired
	private VisitRepository visitRepo;
	
	@Override
	public List<User> getAllUsers() {
		//invoke dao's method
		return userRepo.findAll();
	}
	
//	@Override
//	public String deleteUser(Long userId) {
//		userRepo.deleteById(userId);
//		return "User details deleted for ID = " + userId;
//	}
	@Override
	public String deleteUser(Long userId) {
        Optional<User> userOptional = userRepo.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Visit> visits = user.getVisits();
            // Delete all visits associated with the user
            visits.forEach(visit -> visitRepo.deleteByUserId(userId));
            // Delete the user
            userRepo.deleteById(userId);
            return "User Successfully Deleted";
            
        } else {
            throw new EntityNotFound("User with id " + userId + " not found");
        }
    }
	
	@Override
	public User getDetails(Long userId) {
		return userRepo.findById(userId).orElseThrow(()->new UserHandlingException("Invalid User ID"));
	}
	@Override
	public String updateDetails(User existingUser,UserSignup transientUser) {
	 userRepo.setUserInfoById(transientUser.getFirstName(), transientUser.getLastName(),transientUser.getEmail(),transientUser.getPassword(), existingUser.getId());
	 return "User updated successfully";
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
	
	@Override
	public List<Course> getAllEnrolledCourses(Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new EntityNotFound("User not found"));
        return user.getEnrolledCourses();
    }

	@Override
    public List<Course> getAllNotEnrolledCourses(Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new EntityNotFound("User not found"));
        List<Course> allCourses = courseRepo.findAll();
        allCourses.removeAll(user.getEnrolledCourses());
        return allCourses;
    }
	
	public List<Visit> getAllVisitsByUserIdAndCourseId(Long userId, Long courseId) {
        User user = getDetails(userId);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        List<Visit> visits = new ArrayList<>();
        for (Course course : user.getEnrolledCourses()) {
            if (course.getId() == courseId) {
                for (Content content : course.getContents()) {
                    visits.addAll(content.getVisits());
                }
                break;
            }
        }
        return visits;
    }
}
