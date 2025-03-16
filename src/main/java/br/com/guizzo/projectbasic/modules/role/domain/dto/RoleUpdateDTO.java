package br.com.guizzo.projectbasic.modules.role.domain.dto;

import br.com.guizzo.projectbasic.modules.role.domain.enums.RoleReferences;
import br.com.guizzo.projectbasic.shared.domain.enums.Status;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RoleUpdateDTO {
    private String name;

    private Boolean isDefault;

    private RoleReferences reference;

    private Status status;

    private List<Long> abilitiesIds;
    
}
