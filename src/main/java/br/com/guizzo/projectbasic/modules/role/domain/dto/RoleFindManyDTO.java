package br.com.guizzo.projectbasic.modules.role.domain.dto;

import br.com.guizzo.projectbasic.modules.role.domain.enums.RoleReferences;
import br.com.guizzo.projectbasic.shared.domain.dto.PaginationRequestDTO;
import br.com.guizzo.projectbasic.shared.domain.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RoleFindManyDTO extends PaginationRequestDTO {
    private String search;
    private String name;
    private Boolean isDefault;
    private RoleReferences reference;
    private List<Status> status;
    private Boolean includeDeleted = false;

    public RoleFindManyDTO() {
        super();
        this.includeDeleted = false;
    }
}
