package br.com.guizzo.projectbasic.modules.auth.domain.dto;

import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthLoginResponseDTO{
    private User user;
    private String token;
    private String refreshToken;
}
