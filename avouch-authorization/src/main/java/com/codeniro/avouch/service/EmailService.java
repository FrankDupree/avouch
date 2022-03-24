package com.codeniro.avouch.service;

import com.codeniro.avouch.domain.model.Email;
import com.codeniro.avouch.domain.model.User;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;

@Service
public class EmailService {
    private final TemplateEngine templateEngine;

    private final JavaMailSender javaMailSender;

    public EmailService(TemplateEngine templateEngine, JavaMailSender javaMailSender) {
        this.templateEngine = templateEngine;
        this.javaMailSender = javaMailSender;
    }

    public void sendMail(User user, Email email) throws MessagingException {
        Context context = new Context();
        context.setVariable("user", user);

        String process = templateEngine.process(email.getTemplate(), context);
        javax.mail.internet.MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        helper.setSubject(email.getSubject());
        helper.setText(process, true);
        helper.setTo(email.getTo());
        javaMailSender.send(mimeMessage);
    }

}
