package com.event.vijay.controller;

import static org.springframework.http.HttpStatus.EXPECTATION_FAILED;
import static org.springframework.http.HttpStatus.OK;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.event.vijay.dto.response.BasicResponse;
import com.event.vijay.dto.response.UserResponse;
import com.event.vijay.service.UserService;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    
    private static final String USERLIST = "/list";
    private static final String ALL_USERS = "/all";
    
    @Autowired
    private UserService userService; 
    
    @GetMapping(USERLIST)
    public ResponseEntity<BasicResponse<UserResponse>> getAllUser(){
        BasicResponse<UserResponse> response=new BasicResponse<>();
        try{
            response = userService.getAllUser();
            return new ResponseEntity<>(response, OK);
        }
        catch(Exception e){
            response.setMessage("Something went wrong!");
            return new ResponseEntity<>(response, EXPECTATION_FAILED);
        }
    }
    
    @GetMapping(ALL_USERS)
    public ResponseEntity<BasicResponse<UserResponse>> getAllUsersForAdmin(){
        BasicResponse<UserResponse> response=new BasicResponse<>();
        try{
            response = userService.getAllUser();
            return new ResponseEntity<>(response, OK);
        }
        catch(Exception e){
            response.setMessage("Something went wrong!");
            return new ResponseEntity<>(response, EXPECTATION_FAILED);
        }
    }
}