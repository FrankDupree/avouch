package com.codeniro.avouch.service;

import com.codeniro.avouch.domain.model.PasswordResetToken;
import com.codeniro.avouch.domain.model.Role;
import com.codeniro.avouch.domain.model.User;
import com.codeniro.avouch.domain.model.VerificationToken;
import com.codeniro.avouch.repository.IRoleRepository;
import com.codeniro.avouch.repository.IUserRepository;
import com.codeniro.avouch.repository.PasswordResetTokenRepository;
import com.codeniro.avouch.repository.VerificationTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

import java.util.Calendar;
import java.util.Optional;
import java.util.UUID;

@Service @RequiredArgsConstructor @Transactional @Slf4j
public class UserService implements  IUserService{
    private final IUserRepository userRepository;
    private final IRoleRepository roleRepository;
    @Autowired
    private VerificationTokenRepository verificationTokenRepository;
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User saveUser(User user) {
        log.info("Saving new user {} to the database", user.getId());
        var role  = roleRepository.findByName("USER");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.getRoles().add(role);
        if(user.getUsername() == null){
            user.setUsername(UUID.randomUUID().toString());
        }
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
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }


    //Token
    @Override
    public void saveVerificationToken(String token, User user) {
        VerificationToken verificationToken
                = new VerificationToken(user, token);

        verificationTokenRepository.save(verificationToken);
    }


    @Override
    public String validateVerificationToken(String token) {
        VerificationToken verificationToken
                = verificationTokenRepository.findByToken(token);

        if (verificationToken == null) return "invalid";

        User user = verificationToken.getUser();
        Calendar cal = Calendar.getInstance();

        if ((verificationToken.getExpirationTime().getTime()
                - cal.getTime().getTime()) <= 0) {
            verificationTokenRepository.delete(verificationToken);
            return "expired";
        }

        user.setEmailVerified(true);
        userRepository.save(user);
        return "valid";
    }

    @Override
    public VerificationToken generateNewVerificationToken(String oldToken) {
        VerificationToken verificationToken
                = verificationTokenRepository.findByToken(oldToken);
        verificationToken.setToken(UUID.randomUUID().toString());
        verificationTokenRepository.save(verificationToken);
        return verificationToken;
    }

    @Override
    public void createPasswordResetTokenForUser(User user, String token) {
        PasswordResetToken passwordResetToken
                = new PasswordResetToken(user,token);
        passwordResetTokenRepository.save(passwordResetToken);
    }

    @Override
    public String validatePasswordResetToken(String token) {
        PasswordResetToken passwordResetToken
                = passwordResetTokenRepository.findByToken(token);

        if (passwordResetToken == null) return "invalid";

        User user = passwordResetToken.getUser();
        Calendar cal = Calendar.getInstance();

        if ((passwordResetToken.getExpirationTime().getTime()
                - cal.getTime().getTime()) <= 0) {
            passwordResetTokenRepository.delete(passwordResetToken);
            return "expired";
        }

        return "valid";
    }


    @Override
    public Optional<User> getUserByPasswordResetToken(String token) {
        return Optional.ofNullable(passwordResetTokenRepository.findByToken(token).getUser());
    }


    @Override
    public void changePassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public boolean checkIfValidOldPassword(User user, String oldPassword) {
        return passwordEncoder.matches(oldPassword, user.getPassword());
    }

}
