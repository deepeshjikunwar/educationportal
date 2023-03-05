package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.app.dto.AdminLogin;
import com.app.dto.AdminSignup;
import com.app.pojos.Admin;
import com.app.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
	@Autowired
	private AdminService adminService;

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
	
}
