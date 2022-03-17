package com.codeniro.avouch.service;


import com.codeniro.avouch.domain.model.User;
import com.codeniro.avouch.repository.IUserRepository;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class IdentityService implements UserDetailsService {

    private IUserRepository userRepo;


    public IdentityService(IUserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User userContext;
        if(EmailValidator.getInstance().isValid(email)){
            userContext = userRepo.findByEmail(email);
        }else if(email.length() == 11){
            userContext = userRepo.findByPhoneNumber(email);
        }else{
            userContext = null;
        }
        if(userContext == null) {
            throw new UsernameNotFoundException("User not found!");
        }
        return org.springframework.security.core.userdetails.User.withUsername(userContext.getUsername())
                .password(userContext.getPassword())
                .authorities("USER")
                .build();
    }
}
