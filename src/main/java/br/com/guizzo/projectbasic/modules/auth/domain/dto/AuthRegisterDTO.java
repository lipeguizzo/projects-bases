package br.com.guizzo.projectbasic.modules.auth.domain.dto;


import br.com.guizzo.projectbasic.modules.address.domain.dto.AddressCreateDTO;
import br.com.guizzo.projectbasic.modules.role.domain.enums.RoleReferences;
import br.com.guizzo.projectbasic.modules.user.domain.enums.UserGender;
import br.com.guizzo.projectbasic.shared.annotations.Password;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthRegisterDTO{

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

        @NotNull(message = "Referência inválida!")
        private RoleReferences reference;

        private String organizationName;

        private String organizationTradeName;

        private String organizationEmail;

        private AddressCreateDTO address;
}
