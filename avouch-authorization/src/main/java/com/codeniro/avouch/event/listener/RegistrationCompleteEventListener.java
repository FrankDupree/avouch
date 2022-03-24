package com.codeniro.avouch.event.listener;

import com.codeniro.avouch.domain.model.Email;
import com.codeniro.avouch.domain.model.User;
import com.codeniro.avouch.event.RegistrationCompleteEvent;
import com.codeniro.avouch.service.EmailService;
import com.codeniro.avouch.service.UserService;
import lombok.extern.slf4j.Slf4j;
import lombok.var;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import java.util.UUID;

@Component
@Slf4j
public class RegistrationCompleteEventListener implements
        ApplicationListener<RegistrationCompleteEvent> {

    private final UserService userService;
    private final EmailService emailService;

    public RegistrationCompleteEventListener(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }

    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        //Create the Verification Token for the User with Link
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        userService.saveVerificationToken(token,user);
        //Send Mail to user
        String url =
                event.getApplicationUrl()
                        + "/verifyRegistration?token="
                        + token;

        //send verification link
        var email = new Email();
        email.setTemplate("emails/verify-email");
        email.setSubject("Email verification");
        email.setTo(user.getEmail());
        user.setPassword(url);
        try {
            emailService.sendMail(user, email);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        log.info("Click the link to verify your account: {}",
                url);
    }
}
