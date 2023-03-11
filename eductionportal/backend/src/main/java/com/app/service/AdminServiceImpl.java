package com.app.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.modelmapper.ModelMapper;

import com.app.dao.AdminRepository;
import com.app.dao.ContentRepository;
import com.app.dao.CourseRepository;
import com.app.dao.UserRepository;
import com.app.dto.AddContent;
import com.app.dto.AddCourse;
import com.app.dto.AdminSignup;
import com.app.dto.UserDTO;
import com.app.exception.EntityNotFound;
import com.app.pojos.Admin;
import com.app.pojos.Content;
import com.app.pojos.Course;
import com.app.pojos.User;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private AdminRepository adminRepo;
	@Autowired
	private CourseRepository courseRepo;
	@Autowired
	private ContentRepository contentRepo;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Admin authenticateAdmin(String email, String password) {
		return adminRepo.findByEmailAndPassword(email, password);
	}

	@Override
	public Admin addAdmin(AdminSignup transientAdmin) {
		Admin admin = new Admin();
		admin.setFirstName(transientAdmin.getFirstName());
		admin.setLastName(transientAdmin.getLastName());
		admin.setEmail(transientAdmin.getEmail());
		admin.setPassword(transientAdmin.getPassword());
		return adminRepo.save(admin);
	}

	@Override
	public Course addCourse(AddCourse transientCourse, Long adminId) {
		Course course = new Course();
		course.setTitle(transientCourse.getTitle());
		course.setStartDate(transientCourse.getStartDate());
		course.setEndDate(transientCourse.getEndDate());
		course.setCapacity(transientCourse.getCapacity());
		Admin admin = adminRepo.findById(adminId).orElseThrow(()-> new EntityNotFound("Entity Not Found"));
		return admin.addCourse(course);
	}

	@Override
	public Content addContent(AddContent transientContent, Long courseId) {
		Course existingCourse = courseRepo.findById(courseId).orElseThrow(()-> new EntityNotFound("No Such Course Exist with ID: " +courseId ));
		Content content = new Content();
		content.setContentName(transientContent.getContentName());
		content.setLink(transientContent.getLink());
		return existingCourse.addContentToCourse(content);
	}

	@Override
	public Optional<Admin> findById(Long adminId) {
		return adminRepo.findById(adminId);
	}

	@Override
	public List<Course> findAllCourseByAdminId(Long adminId) {
		return courseRepo.findAllCoursesByAdminId(adminId);
	}

	@Override
	public List<UserDTO> getUsersEnrolledInCourseAddedByAdmin(Long adminId, Long courseId) {
		  Admin admin = adminRepo.findById(adminId).orElseThrow(() -> new EntityNotFound("Admin not found with id: " + adminId));
	        Course course = courseRepo.findById(courseId).orElseThrow(() -> new EntityNotFound("Course not found with id: " + courseId));
	        if (!admin.getCourses().contains(course)) {
	            throw new EntityNotFound("Course with id: " + courseId + " is not added by Admin with id: " + adminId);
	        }
	        List<User> users = userRepo.findByEnrolledCourses(course);
	        List<UserDTO> userDTOs = users.stream().map(user -> modelMapper.map(user, UserDTO.class)).collect(Collectors.toList());
	        return userDTOs;
	}

	@Override
	public Course findCourseByCourseId(Long courseId) {
		return courseRepo.findById(courseId).orElseThrow(()-> new EntityNotFound("Course Not Found"));
	}
	
	@Override
	public void removeUserFromCourse(Long courseId, Long userId) {
	    Course course = courseRepo.findById(courseId).orElseThrow(()-> new EntityNotFound("Course Not Found"));;
	    User user = userRepo.findById(userId).orElseThrow(()-> new EntityNotFound("User Not Found"));
//	    if (!admin.getCourses().contains(course)) {
//	        throw new IllegalArgumentException("Admin does not have access to the course");
//	    }
	    if (!course.getEnrolledUsers().contains(user)) {
	        throw new IllegalArgumentException("User is not enrolled in the course");
	    }
	    course.getEnrolledUsers().remove(user);
	    user.getEnrolledCourses().remove(course);
	    course.setCountUser(course.getCountUser() - 1);
	}

}