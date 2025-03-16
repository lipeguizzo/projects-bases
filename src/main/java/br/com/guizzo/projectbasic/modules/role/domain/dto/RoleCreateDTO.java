package br.com.guizzo.projectbasic.modules.role.domain.dto;

import br.com.guizzo.projectbasic.modules.role.domain.enums.RoleReferences;
import br.com.guizzo.projectbasic.shared.domain.enums.Status;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RoleCreateDTO {
    @NotNull(message = "Nome inválido!")
    private String name;

    @NotNull(message = "Valor padrão inválido!")
    private Boolean isDefault;

    @NotNull(message = "Referência inválida!")
    private RoleReferences reference;

    @NotNull(message = "Status inválido!")
    private Status status;

    @NotNull(message = "Habilidades inválida!")
    private List<Long> abilitiesIds;

    private Long organizationId;

    private Long companyId;
    
}
