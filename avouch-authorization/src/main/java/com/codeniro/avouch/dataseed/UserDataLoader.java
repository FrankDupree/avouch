package com.codeniro.avouch.dataseed;

import com.codeniro.avouch.domain.model.User;
import com.codeniro.avouch.repository.IRoleRepository;
import com.codeniro.avouch.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserDataLoader implements CommandLineRunner {

    @Autowired
    IUserRepository userRepository;
    @Autowired
    IRoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        loadUserData();

    }

    private void loadUserData() {
        if (userRepository.count() == 0) {
            User user1 = new User();
            user1.setUsername("frank");
            user1.setEmail("frank@yahoo.com");
            user1.setPassword(passwordEncoder.encode("telipaty"));
            user1.getRoles().add(roleRepository.findByName("USER"));
            userRepository.save(user1);
        }
        System.out.println(userRepository.count());
    }
}
