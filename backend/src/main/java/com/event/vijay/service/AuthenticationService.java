package com.event.vijay.service;

import com.event.vijay.dto.request.LoginRequest;
import com.event.vijay.dto.request.RegisterRequest;
import com.event.vijay.dto.response.LoginResponse;
import com.event.vijay.dto.response.RegisterResponse;

public interface AuthenticationService {
    RegisterResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

}
