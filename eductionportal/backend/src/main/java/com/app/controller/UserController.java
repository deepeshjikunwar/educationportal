package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.ContentRepository;
import com.app.dto.AdminLogin;
import com.app.dto.ErrorResponse;
import com.app.dto.ResponseDTO;
import com.app.dto.UserLogin;
import com.app.dto.UserSignup;
import com.app.pojos.Admin;
import com.app.pojos.Course;
import com.app.pojos.User;
import com.app.pojos.Visit;
import com.app.service.AssignmentService;
import com.app.service.CourseService;
import com.app.service.UserService;
import com.app.service.VisitService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {
	//dependency: service layer i/f
	@Autowired
	private UserService userService;
	@Autowired
	private VisitService visitService;
	@Autowired
	private ObjectMapper objectMapper;
	@Autowired
	private CourseService courseService;
	@Autowired
	private AssignmentService assignmentService;

	public UserController() {
		System.out.println("in ctor"+ getClass().getName());
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UserLogin usercredentials){
		User validUser = userService.authenticateUser(usercredentials.getEmail(),usercredentials.getPassword());

		if(validUser != null) {
			return ResponseEntity.ok(validUser);
		}
		else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
		}
	}
	//REST API endpoint : for getting all users
	@GetMapping
	public List<User> fetchAllUser(){
		System.out.println("in fetch all users");
		return userService.getAllUsers();
	}

	//REST API endpoint : for adding new user (create new resource)that returns to the frontend HTTP status code and user in response body
	@PostMapping("/signup")
	public ResponseEntity<?> addUser(@RequestBody UserSignup transientUser ) {
		//invoke service layer's method for saving user details
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(userService.addUser(transientUser));	
		}catch(RuntimeException e) {
			System.out.println("err in add" + e);
			return new ResponseEntity<>(new ErrorResponse("Adding User Failed", e.getMessage()),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	//REST API endpoint : to delete a user by id
	@DeleteMapping("/{userId}")
	public ResponseEntity<ResponseDTO> deleteUserDetails(@PathVariable Long userId)
	{
		System.out.println("in delete user details" + userId);
		//invoke service layer method for deleting user details
		//return new ResponseEntity<>(new ResponseDTO(userService.deleteUser(userId)),HttpStatus.OK);
		return ResponseEntity.ok(new ResponseDTO(userService.deleteUser(userId)));
	}

	//add REST API endpoint : to get a user by id
	@GetMapping("/{userId}")
	public ResponseEntity<?> getUserDetails(@PathVariable Long userId){
		System.out.println("in get user details" + userId);
		//invoke service method to get user details
		try {
			return ResponseEntity.ok(userService.getDetails(userId));
		}catch(RuntimeException e) {
			System.out.println("err in get" + e);
			return new ResponseEntity<>(new ErrorResponse("Fetching User Details Failed", e.getMessage()),HttpStatus.BAD_REQUEST);
		}
	}

	//add REST API endpoint : to update a user by id
	//	@PutMapping("/{userId}")
	//	public ResponseEntity<?> updateUserDetails(@RequestBody User detachedUser, @PathVariable Long userId){
	//		System.out.println("in update user" + detachedUser + " " + userId);
	//		try {
	//			//invoke service layer method for user details updation
	//			User existingUser = userService.getDetails(userId);
	//			//valid user, invoke setters to update the state
	//			//existingUser : user details fetched from DB(stale)
	//			//detachedUser : updated user details from frontend
	//			return ResponseEntity.ok(userService.updateDetails(detachedUser));
	//		}catch(RuntimeException e) {
	//			System.out.println("err in get" + e);
	//			return new ResponseEntity<>(new ErrorResponse("Fetchin user details failed", e.getMessage()),HttpStatus.BAD_REQUEST);
	//		}
	//	}
	@PutMapping("/{userId}")
	public ResponseEntity<?> updateUser(@RequestBody UserSignup transientUser,@PathVariable Long userId) {
		//invoke service layer's method for saving user details
		try {
			User existingUser = userService.getDetails(userId);
			return ResponseEntity.status(HttpStatus.CREATED).body(userService.updateDetails(existingUser,transientUser));	
		}catch(RuntimeException e) {
			System.out.println("err in add" + e);
			return new ResponseEntity<>(new ErrorResponse("Adding User Failed", e.getMessage()),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	//method for user to enroll into a course
	@GetMapping("{userId}/enroll/{courseId}") 
	public ResponseEntity<?> enrollIntoCourse(@PathVariable Long userId, @PathVariable Long courseId){
		return  ResponseEntity.status(HttpStatus.CREATED).body(userService.enrollIntoCourse(userId,courseId));

	}

	//method for user to mark a topic as completed
	@PostMapping("/{userId}/{contentId}")
	public ResponseEntity<?> markContentAsVisited(@PathVariable Long userId, @PathVariable Long contentId, @RequestBody JsonNode requestBody) {
		boolean isVisited = requestBody.get("isVisited").asBoolean();
		System.out.println("in mark topic isVisited:"+ isVisited);
		return  ResponseEntity.status(HttpStatus.CREATED).body(visitService.markContentAsVisited(userId, contentId, isVisited));
	}
	//method to get all available courses
	@GetMapping("/allCourses")
	public ResponseEntity<?> getAllCourses(){
		return  ResponseEntity.status(HttpStatus.OK).body(courseService.getAllCourses());
	}
	//method to get all assignment by courseId
	@GetMapping("/courses/{courseId}/getAssignment")
	public ResponseEntity<?> getAllAssignment(@PathVariable Long courseId){
		return ResponseEntity.status(HttpStatus.OK).body(assignmentService.getAllAssignmentsByCourseId(courseId));
	}
	//method to get all enrolled courses
	@GetMapping("/{userId}/enrolled-courses")
	public ResponseEntity<List<Course>> getAllEnrolledCourses(@PathVariable Long userId) {
		List<Course> courses = userService.getAllEnrolledCourses(userId);
		return ResponseEntity.ok().body(courses);
	}
	
	//method to get all not enrolled courses
	@GetMapping("/{userId}/not-enrolled-courses")
	public ResponseEntity<List<Course>> getAllNotEnrolledCourses(@PathVariable Long userId) {
		List<Course> courses = userService.getAllNotEnrolledCourses(userId);
		return ResponseEntity.ok().body(courses);
	}
}
