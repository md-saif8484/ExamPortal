package com.exam.controller;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.entity.Role;
import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
//	creating user
	@PostMapping("/")
	public ResponseEntity<?> createUser(@RequestBody User user) throws Exception
	{
		System.out.println("Received User: " + user);
		if (user.getUsername() == null || user.getUsername().isEmpty()) {
	        throw new Exception("Username is required");
	    }
		
		// Check if user already exists
	    if (this.userService.getUser(user.getUsername()) != null) { 
	        return ResponseEntity
	                .status(HttpStatus.BAD_REQUEST)
	                .body(Collections.singletonMap("message", "User already exists"));
	    }
		
		user.setProfile("default.png");
		
//		encrypting password
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
		
		Set<UserRole> roles = new HashSet<>();
		Role role = new Role();
		role.setRoleId(45L);
		role.setRoleName("Normal");
//		role.setRoleName("Admin");
		
		UserRole userRole = new UserRole();
		userRole.setUser(user);
		userRole.setRole(role);
		
		roles.add(userRole);
		User createdUser = this.userService.createUser(user, roles);
//		return this.userService.createUser(user, roles);
		return ResponseEntity.ok(createdUser);
	}
	
//	fetching user
	@GetMapping("/{username}")
	public User getUser(@PathVariable("username") String username)
	{
		return this.userService.getUser(username);
	}
	
//	deleteing user
	@DeleteMapping("/{userId}")
	public void deleteUser(@PathVariable("userId") Long userId)
	{
		this.userService.deleteUser(userId);
	}
}
