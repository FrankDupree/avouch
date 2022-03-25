package com.codeniro.avouch.controller;

import com.codeniro.avouch.domain.model.User;
import com.codeniro.avouch.dto.RegisterModel;
import com.codeniro.avouch.event.RegistrationCompleteEvent;
import com.codeniro.avouch.service.UserService;
import lombok.var;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;


@Controller
public class AccountController {

    @Autowired
    private ApplicationEventPublisher publisher;

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String login(){
        return "account/login.html";
    }


    @GetMapping("/register")
    public String register(Model model){
        model.addAttribute("formData", new RegisterModel());
        return "account/register";
    }

    @GetMapping("/email-verification")
    public String emailVerification(Model model){
        model.addAttribute("formData", new RegisterModel());
        return "account/email-verification";
    }

//    @PostMapping("/register")
//    public ResponseEntity<User> register(@RequestBody @Valid RegisterModel userModel, final HttpServletRequest request) {
//        User newUser = new User();
//        newUser.setPassword(userModel.getPassword());
//        //Todo: use better validator for phone number
//        if(EmailValidator.getInstance().isValid(userModel.getEmailOrPhone())){
//            newUser.setEmail(userModel.getEmailOrPhone());
//        }else if(userModel.getEmailOrPhone().length() == 11){
//            newUser.setPhoneNumber(userModel.getEmailOrPhone());
//        }else{
//            throw new IllegalArgumentException("Email or phone number not valid");
//        }
//        if(userModel.getUsername() != null){
//            var userExist = userService.getUserByUsername(userModel.getUsername());
//            if(userExist != null) throw new IllegalArgumentException("Username already taken");
//            newUser.setUsername(userModel.getUsername());
//        }
//        newUser = userService.saveUser(newUser);
//        publisher.publishEvent(new RegistrationCompleteEvent(
//                newUser,
//                applicationUrl(request)
//        ));
//        return ResponseEntity.created(null).body(newUser);
//    }

    @PostMapping(path="/register", consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    public String register(@Valid @ModelAttribute("formData") RegisterModel userModel, BindingResult bindingResult, final HttpServletRequest request,  Model model, Errors errors) {
        if(bindingResult.hasErrors()){
            return "account/register";
        }
        User newUser = new User();
        newUser.setPassword(userModel.getPassword());
        //Todo: use better validator for phone number
        if(EmailValidator.getInstance().isValid(userModel.getEmailOrPhone())){
            newUser.setEmail(userModel.getEmailOrPhone());
        }else if(userModel.getEmailOrPhone().length() == 11){
            newUser.setPhoneNumber(userModel.getEmailOrPhone());
        }else{
            errors.reject("email",null,"Email or phone number not valid");
        }
        if(userModel.getUsername() != null){
            var userExist = userService.getUserByUsername(userModel.getUsername());
            if(userExist != null) errors.reject("username",null,"Username already taken");
            newUser.setUsername(userModel.getUsername());
        }

        if(errors.hasErrors()){
            return "account/register";
        }

        newUser = userService.saveUser(newUser);
        publisher.publishEvent(new RegistrationCompleteEvent(
                newUser,
                applicationUrl(request)
        ));

        model.addAttribute(userModel);
        return "redirect:email-verification";
    }

    @PostMapping("/checkusername")
    public ResponseEntity<String> checkUsername(@RequestParam String username) {
        var userExist = userService.getUserByUsername(username);
        if(userExist != null){
            return  new ResponseEntity<>("none", HttpStatus.OK);
        }
        return  new ResponseEntity<>("available", HttpStatus.OK);
    }


    private String applicationUrl(HttpServletRequest request) {
        return "http://" +
                request.getServerName() +
                ":" +
                request.getServerPort() +
                request.getContextPath();
    }
}
