package com.codeniro.avouch.service;


import com.codeniro.avouch.domain.model.Role;
import com.codeniro.avouch.domain.model.User;
import com.codeniro.avouch.domain.model.VerificationToken;

import java.util.Optional;

public interface IUserService {
    User saveUser(User user);
    Role saveRole(Role role);
    User getUser(String username);
    User getUserByPhone(String phoneNumber);
    User getUserByEmail(String email);
    User getUserByUsername(String username);



    //Token
    void saveVerificationToken(String token, User user);
    String validateVerificationToken(String token);
    VerificationToken generateNewVerificationToken(String oldToken);
    void createPasswordResetTokenForUser(User user, String token);
    String validatePasswordResetToken(String token);
    Optional<User> getUserByPasswordResetToken(String token);
    void changePassword(User user, String newPassword);
    boolean checkIfValidOldPassword(User user, String oldPassword);
}
