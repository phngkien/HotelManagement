package com.dev.service.interfac;

import com.dev.dto.LoginRequest;
import com.dev.dto.Response;
import com.dev.entity.User;

public interface IUserService {
    Response register(User user);
    Response login(LoginRequest loginRequest);
    Response getAllUsers();
    Response getUserBookingHistory(String userId);
    Response deleteUser(String userId);
    Response getUserById(String userId);
    Response getMyInfo(String email);


}
