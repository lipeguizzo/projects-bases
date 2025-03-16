package br.com.guizzo.projectbasic.modules.auth.domain.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthRecoverPasswordDTO{
        @NotNull(message = "E-mail inválido!")
        @Email(message = "Formato de e-mail incorreto!")
        private String email;

        private String url;
}
