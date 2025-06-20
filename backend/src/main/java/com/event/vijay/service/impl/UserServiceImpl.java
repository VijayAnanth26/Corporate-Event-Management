package com.event.vijay.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.event.vijay.dto.response.BasicResponse;
import com.event.vijay.dto.response.UserResponse;
import com.event.vijay.model.User;
import com.event.vijay.repository.UserRepository;
import com.event.vijay.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public BasicResponse<UserResponse> getAllUser() {
        List<User> users = userRepository.findAll();
        List<UserResponse> userResponses = new ArrayList<>();
        
        for (User user : users) {
            UserResponse response = new UserResponse();
            response.setId(user.getId());
            response.setName(user.getName());
            response.setEmail(user.getEmail());
            response.setPassword(user.getPassword());
            response.setRole(user.getRole());
            userResponses.add(response);
        }
        
        BasicResponse<UserResponse> response = new BasicResponse<>();
        response.setMessage("User data fetched successfully!!!");
        response.setData(userResponses);
        
        return response;
    }
}