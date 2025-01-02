package com.exam.service;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.exam.entity.User;
import com.exam.entity.UserRole;

@Service
public interface UserService {
	
	public User createUser(User user, Set<UserRole> userRoles) throws Exception;

}
