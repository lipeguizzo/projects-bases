package br.com.guizzo.projectbasic.shared.interceptors;

import br.com.guizzo.projectbasic.shared.annotations.Password;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordInterceptor implements ConstraintValidator<Password, String> {
    @Override
    public void initialize(Password constraintAnnotation) {
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (password == null || password.isEmpty()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("A senha inválida!")
                    .addConstraintViolation();
            return false;
        }

        if (!password.matches("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*(),.?\":{}|<>]).{8,}$")) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Senha deve ter pelo menos 1 carácter maiúsculo, 1 carácter minúsculo, 1 um carácter numérico e um carácter especial!")
                    .addConstraintViolation();
            return false;
        }

        return true;
    }
}
