package com.codeniro.avouch.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/messages")
@RestController
public class MessagesController {
    @GetMapping("/")
    public String[] getMessages() {
        return new String[] {"Message 1", "Message 2", "Message 3"};
    }
}
