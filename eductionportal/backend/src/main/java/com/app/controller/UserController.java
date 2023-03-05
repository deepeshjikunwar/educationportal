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
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ErrorResponse;
import com.app.dto.ResponseDTO;
import com.app.pojos.User;
import com.app.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {
	//dependency: service layer i/f
	@Autowired
	private UserService userService;

	public UserController() {
		System.out.println("in ctor"+ getClass().getName());
	}

	//add REST API endpoint : for getting all users
	@GetMapping
	public List<User> fetchAllUser(){
		System.out.println("in fetch all users");
		return userService.getAllUsers();
	}

	//add REST API endpoint : for adding new user (create new resource)that returns to the frontend HTTP status code and user in response body
	@PostMapping
	public ResponseEntity<?> addNewUserDetails(@RequestBody User transientUser ) {
		System.out.println("in add user" + transientUser);
		//invoke service layer's method for saving user details
		try {
			return new ResponseEntity<>(userService.addUser(transientUser),HttpStatus.CREATED);	
		}catch(RuntimeException e) {
			System.out.println("err in add" + e);
			return new ResponseEntity<>(new ErrorResponse("Adding User Failed", e.getMessage()),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	//add REST API endpoint : to delete a user by id
	@DeleteMapping("/{userId}")
	public ResponseEntity<ResponseDTO> deleteUserDetails(@PathVariable Long userId)
	{
		System.out.println("in delete user details" + userId);
		//invoke service layer method for deleting user details
		//return new ResponseEntity<>(new ResponseDTO(userService.deleteUser(userId)),HttpStatus.OK);
		return ResponseEntity.ok(new ResponseDTO(userService.deleteUser(userId)));
	}

	//add REST API endpoint : to get a user by id
	@GetMapping("/{id}")
	public ResponseEntity<?> getUserDetails(@PathVariable Long id){
		System.out.println("in get user details" + id);
		//invoke service method to get user details
		try {
			return ResponseEntity.ok(userService.getDetails(id));
		}catch(RuntimeException e) {
			System.out.println("err in get" + e);
			return new ResponseEntity<>(new ErrorResponse("Fetching User Details Failed", e.getMessage()),HttpStatus.BAD_REQUEST);
		}
	}

	//add REST API endpoint : to update a user by id
	@PutMapping("/{id}")
	public ResponseEntity<?> updateUserDetails(@RequestBody User detachedUser, @PathVariable Long id){
		System.out.println("in update user" + detachedUser + " " + id);
		try {
		//invoke service layer method for user details updation
		User existingUser = userService.getDetails(id);
		//valid user, invoke setters to update the state
		//existingUser : user details fetched from DB(stale)
		//detachedUser : updated user details from frontend
		return ResponseEntity.ok(userService.updateDetails(detachedUser));
		}catch(RuntimeException e) {
			System.out.println("err in get" + e);
			return new ResponseEntity<>(new ErrorResponse("Fetchin user details failed", e.getMessage()),HttpStatus.BAD_REQUEST);
		}
	}



}
