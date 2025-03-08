package com.exam.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.exam.config.JwtUtils;
import com.exam.entity.JwtRequest;
import com.exam.entity.JwtResponse;
import com.exam.entity.User;
import com.exam.service.impl.UserDetailsServiceImpl;

@RestController
public class AuthenticateController {
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	@Autowired
	private JwtUtils jwtUtils;
	
	
//	generate token
	@PostMapping("/generate-token")
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception
	{
		try {
			authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
		}
		catch(UsernameNotFoundException e)
		{
			e.printStackTrace();
			throw new Exception("User not found");
		}
		
//		authenticated
		
		UserDetails userDetails = this.userDetailsServiceImpl.loadUserByUsername(jwtRequest.getUsername());
		String token = this.jwtUtils.generateToken(userDetails.getUsername());
		return ResponseEntity.ok(new JwtResponse(token));
	}
	
	
	private void authenticate(String username, String password) throws Exception
	{
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
			
		}
		catch(DisabledException e)
		{
			throw new Exception("User diasbled" + e.getMessage());
		}
		catch(BadCredentialsException e)
		{
			throw new Exception("Invalid credential" + e.getMessage());
		}
	}
	
	@GetMapping("/current-user")
	public ResponseEntity<?> getCurrentUser(Principal principal) {
	    if (principal == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
	    }
	    System.out.println("user:-" + principal.getName());
//	    String username = this.jwtUtils.extractUsername(principal.getName());
	    User user = (User) this.userDetailsServiceImpl.loadUserByUsername(principal.getName());
	    return ResponseEntity.ok(user);
	}

}
