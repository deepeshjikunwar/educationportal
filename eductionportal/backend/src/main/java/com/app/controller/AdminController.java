package com.app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.app.dto.AddContent;
import com.app.dto.AddCourse;
import com.app.dto.AdminLogin;
import com.app.dto.AdminSignup;
import com.app.dto.UserDTO;
import com.app.dto.AssignmentDTO;
import com.app.exception.EntityNotFound;
import com.app.pojos.Admin;
import com.app.pojos.Course;
import com.app.pojos.User;
import com.app.service.AdminService;
import com.app.service.AssignmentService;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
	@Autowired
	private AdminService adminService;
	@Autowired
	private AssignmentService assignmentService;


	public AdminController() {
		System.out.println("in ctor"+ getClass().getName());
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AdminLogin admincredentials){
		Admin validAdmin = adminService.authenticateAdmin(admincredentials.getEmail(),admincredentials.getPassword());

		if(validAdmin != null) {
			return ResponseEntity.ok(validAdmin);
		}
		else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
		}
	}
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody AdminSignup transientAdmin){
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.addAdmin(transientAdmin));
	}
	@PostMapping("{adminId}/addCourse")
	public ResponseEntity<?> addCourse(@RequestBody AddCourse transientCourse,@PathVariable Long adminId){
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.addCourse(transientCourse, adminId));

	}
	@PostMapping("/addContent/{courseId}")
	public ResponseEntity<?> addContent(@RequestBody AddContent transientContent,@PathVariable Long courseId){
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.addContent(transientContent,courseId));
	}

	@GetMapping("/{adminId}/courses")
	public ResponseEntity<?> getCoursesByAdminId(@PathVariable Long adminId) {
		return  ResponseEntity.status(HttpStatus.CREATED).body(adminService.findAllCourseByAdminId(adminId));
	}

	//method to get a list of student enrolled in a course by a particular admin
	@GetMapping("/{adminId}/courses/{courseId}/users")
	public List<UserDTO> getUsersEnrolledInCourseAddedByAdmin(
			@PathVariable("adminId") Long adminId,
			@PathVariable("courseId") Long courseId) {
		List<UserDTO> userDTOs = adminService.getUsersEnrolledInCourseAddedByAdmin(adminId, courseId);
		return userDTOs;
	}

	//method to get a course by Id
	@GetMapping("/course/{courseId}")
	public ResponseEntity<?> getCourseById(@PathVariable Long courseId){
		return ResponseEntity.status(HttpStatus.OK).body(adminService.findCourseByCourseId(courseId));
	}
	//method to create assignment
	@PostMapping("/course/{courseId}/addAssignment")
	public ResponseEntity<?> createAssignmentByCourseId(@RequestBody AssignmentDTO transientAssignment,@PathVariable Long courseId){
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(assignmentService.addAssignmentByCourseId(transientAssignment,courseId));
	}

	//delete a student from a particular course
	@DeleteMapping("/courses/{courseId}/students/{studentId}")
	public ResponseEntity<?> removeStudentFromCourse(@PathVariable Long courseId, @PathVariable Long studentId) {
		adminService.removeStudentFromCourse(courseId, studentId);
		return ResponseEntity.ok().build();
	}
}
