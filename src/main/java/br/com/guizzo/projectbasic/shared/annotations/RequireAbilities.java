package br.com.guizzo.projectbasic.shared.annotations;

import br.com.guizzo.projectbasic.modules.role.domain.enums.AbilityActions;
import br.com.guizzo.projectbasic.modules.role.domain.enums.AbilityCodes;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface RequireAbilities {
    AbilityCodes code();
    AbilityActions action();
}
