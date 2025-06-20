package com.event.vijay.service.impl;

import static com.event.vijay.enumerated.Role.USER;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.event.vijay.dto.request.LoginRequest;
import com.event.vijay.dto.request.RegisterRequest;
import com.event.vijay.dto.response.LoginResponse;
import com.event.vijay.dto.response.RegisterResponse;
import com.event.vijay.dto.response.UserResponse;
import com.event.vijay.model.User;
import com.event.vijay.repository.UserRepository;
import com.event.vijay.service.AuthenticationService;
import com.event.vijay.utils.JwtUtils;

@Service
@SuppressWarnings("null")
public class AuthenticationServiceImpl implements AuthenticationService{

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtil;

    @Autowired
    public AuthenticationServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
                                   AuthenticationManager authenticationManager, JwtUtils jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public RegisterResponse register(RegisterRequest request){
        Optional<User> isUserExists = userRepository.findByEmail(request.getEmail());
        if(isUserExists.isPresent()){
            return RegisterResponse.builder().message("User with mail id "+ request.getEmail() + " is already exists!").build();
        }
        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(USER)
                .build();
        userRepository.save(user);
        return RegisterResponse.builder()
                .message("User created successfully!")
                .build();
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String token = jwtUtil.generateToken(user);
        
        // Create UserResponse
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setName(user.getName());
        userResponse.setEmail(user.getEmail());
        userResponse.setRole(user.getRole());
        
        return LoginResponse.builder()
        .message("User logged in successfully!")
        .token(token)
        .userResponse(userResponse)
        .build();
    }
}