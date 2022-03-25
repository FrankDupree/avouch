package com.codeniro.avouch.dto;


import com.codeniro.avouch.validator.PasswordMatches;
import com.codeniro.avouch.validator.ValidPassword;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;


@Setter
@Getter
@PasswordMatches
public class RegisterModel {
    @NotEmpty(message = "Email or Phone number field is mandatory")
    private String emailOrPhone;
    @ValidPassword
    @NotEmpty(message = "Password field is mandatory")
    private String password;
    private String username;
    @NotEmpty(message = "Confirm password field is mandatory")
    private String confirmPassword;
}



