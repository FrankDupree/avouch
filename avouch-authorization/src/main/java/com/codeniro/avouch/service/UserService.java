package com.codeniro.avouch.service;

import com.codeniro.avouch.domain.model.Role;
import com.codeniro.avouch.domain.model.User;
import com.codeniro.avouch.repository.IRoleRepository;
import com.codeniro.avouch.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

import java.util.UUID;

@Service @RequiredArgsConstructor @Transactional @Slf4j
public class UserService implements  IUserService{
    private final IUserRepository userRepository;
    private final IRoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User saveUser(User user) {
        log.info("Saving new user {} to the database", user.getId());
        var role  = roleRepository.findByName("USER");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.getRoles().add(role);
        user.setUsername(UUID.randomUUID().toString());
        return  userRepository.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        log.info("Saving new role {} to the database", role.getName());
        return  roleRepository.save(role);
    }

    @Override
    public User getUser(String username) {
        return null;
    }

    @Override
    public User getUserByPhone(String phoneNumber) {
        return  userRepository.findByPhoneNumber(phoneNumber);
    }

    @Override
    public User getUserByEmail(String email) {
       return  userRepository.findByEmail(email);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {

    }
}
