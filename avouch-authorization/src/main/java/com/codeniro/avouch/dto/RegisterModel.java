package com.codeniro.avouch.dto;


import com.codeniro.avouch.validator.PasswordMatches;
import com.codeniro.avouch.validator.ValidPassword;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.validation.constraints.NotBlank;


@Setter
@Getter
@PasswordMatches
public class RegisterModel {
    private String emailOrPhone;
    @ValidPassword
    @NonNull
    @NotBlank(message = "New password is mandatory")
    private String password;
    private String username;
    @NonNull
    @NotBlank(message = "Confirm Password is mandatory")
    private String confirmPassword;
}



