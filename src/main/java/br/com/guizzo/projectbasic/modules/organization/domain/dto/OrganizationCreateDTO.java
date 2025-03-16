package br.com.guizzo.projectbasic.modules.organization.domain.dto;

import br.com.guizzo.projectbasic.modules.address.domain.dto.AddressCreateDTO;
import br.com.guizzo.projectbasic.shared.domain.dto.PaginationRequestDTO;
import br.com.guizzo.projectbasic.shared.domain.enums.Status;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@AllArgsConstructor
public class OrganizationCreateDTO {
    @NotNull(message = "Nome inválido!")
    private String name;

    @NotNull(message = "Nome fantasia inválido!")
    private String tradeName;

    @NotNull(message = "E-mail inválido!")
    @Email(message = "Formato de e-mail incorreto!")
    private String email;

    @NotNull(message = "Status inválido!")
    private Status status;

    @NotNull(message = "Endereço inválido!")
    private AddressCreateDTO address;
}
