package br.com.guizzo.projectbasic.modules.user.domain.dto;

import br.com.guizzo.projectbasic.modules.role.domain.enums.RoleReferences;
import br.com.guizzo.projectbasic.modules.user.domain.enums.UserGender;
import br.com.guizzo.projectbasic.shared.domain.dto.PaginationRequestDTO;
import br.com.guizzo.projectbasic.shared.domain.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserFindManyDTO extends PaginationRequestDTO {
    private String search;
    private String name;
    private String email;
    private UserGender gender;
    private Long organizationId;
    private Long companyId;
    private Long roleId;
    private RoleReferences roleReference;
    private List<Status> status;
    private Boolean includeDeleted = false;

    public UserFindManyDTO() {
        super();
        this.includeDeleted = false;
    }
}
