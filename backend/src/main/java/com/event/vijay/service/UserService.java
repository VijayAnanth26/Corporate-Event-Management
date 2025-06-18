package com.event.vijay.service;

import com.event.vijay.dto.response.BasicResponse;
import com.event.vijay.dto.response.UserResponse;

public interface UserService {

    BasicResponse<UserResponse> getAllUser();

}
