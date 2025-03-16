package br.com.guizzo.projectbasic.modules.auth.domain.dto;


import br.com.guizzo.projectbasic.shared.annotations.Password;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResetPasswordDTO{
        @NotNull(message = "Token inválido!")
        private String token;

        @Password
        private String password;
}
