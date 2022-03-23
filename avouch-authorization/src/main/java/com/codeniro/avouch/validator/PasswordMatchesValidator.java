package com.codeniro.avouch.validator;


import com.codeniro.avouch.dto.RegisterModel;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {

    @Override
    public void initialize(PasswordMatches passwordMatches) {
    }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context) {
        RegisterModel userDto = (RegisterModel) obj;
        return userDto.getPassword().equals(userDto.getConfirmPassword());
    }
}
