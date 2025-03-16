package br.com.guizzo.projectbasic.modules.auth.domain.dto;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthRefreshDTO{
        @NotNull(message = "Refresh Token inválido!")
        private String refreshToken;
}
