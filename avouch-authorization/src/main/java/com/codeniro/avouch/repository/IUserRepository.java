package com.codeniro.avouch.repository;

import com.codeniro.avouch.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);
    User findByPhoneNumber(String phoneNumber);
}
