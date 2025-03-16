package br.com.guizzo.projectbasic.shared.annotations;

import br.com.guizzo.projectbasic.shared.interceptors.PasswordInterceptor;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = PasswordInterceptor.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface Password {
    String message() default "Senha inválida!";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
