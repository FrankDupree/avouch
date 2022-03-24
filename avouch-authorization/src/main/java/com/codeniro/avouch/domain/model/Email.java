package com.codeniro.avouch.domain.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Email {
    String to;
    String from;
    String subject;
    String text;
    String template;
}