package br.com.guizzo.projectbasic.modules.user.domain.dto;

import br.com.guizzo.projectbasic.modules.user.domain.enums.UserGender;
import br.com.guizzo.projectbasic.shared.annotations.Password;
import br.com.guizzo.projectbasic.shared.domain.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserUpdateDTO {
    private String name;

    private String email;

    @Password
    private String password;

    private UserGender gender;

    private String phone;

    private Long roleId;

    private Status status;
}
