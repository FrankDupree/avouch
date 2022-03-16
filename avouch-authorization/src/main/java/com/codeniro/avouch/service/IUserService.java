package com.codeniro.avouch.service;


import com.codeniro.avouch.domain.model.Role;
import com.codeniro.avouch.domain.model.User;

public interface IUserService {
    User saveUser(User user);
    Role saveRole(Role role);
    User getUser(String username);
    User getUserByPhone(String phoneNumber);
    User getUserByEmail(String email);

    void addRoleToUser(String username, String roleName);
}
