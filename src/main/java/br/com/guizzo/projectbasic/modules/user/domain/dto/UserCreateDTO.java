package br.com.guizzo.projectbasic.modules.user.domain.dto;

import br.com.guizzo.projectbasic.modules.user.domain.enums.UserGender;
import br.com.guizzo.projectbasic.shared.annotations.Password;
import br.com.guizzo.projectbasic.shared.domain.enums.Status;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserCreateDTO {
    @NotNull(message = "Nome inválido!")
    private String name;

    @NotNull(message = "E-mail inválido!")
    @Email(message = "Formato de e-mail incorreto!")
    private String email;

    @Password
    private String password;

    @NotNull(message = "Gênero inválido!")
    private UserGender gender;

    @NotNull(message = "Telefone inválido!")
    private String phone;

    @NotNull(message = "Status inválido!")
    private Status status;

    @NotNull(message = "Perfil inválido!")
    private Long roleId;

    private Long organizationId;

    private Long companyId;
}
