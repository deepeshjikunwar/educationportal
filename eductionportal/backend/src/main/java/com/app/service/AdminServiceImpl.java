package com.app.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.AdminRepository;
import com.app.dao.ContentRepository;
import com.app.dao.CourseRepository;
import com.app.dto.AddContent;
import com.app.dto.AddCourse;
import com.app.dto.AdminSignup;
import com.app.exception.EntityNotFound;
import com.app.pojos.Admin;
import com.app.pojos.Content;
import com.app.pojos.Course;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private AdminRepository adminRepo;
	@Autowired
	private CourseRepository courseRepo;
	@Autowired
	private ContentRepository contentRepo;

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
		content.setCourse(existingCourse);
		return contentRepo.save(content);
	}

	@Override
	public Optional<Admin> findById(Long adminId) {
		return adminRepo.findById(adminId);
	}

	@Override
	public List<Course> findAllCourseByAdminId(Long adminId) {
		return courseRepo.findAllCoursesByAdminId(adminId);
	}
}
