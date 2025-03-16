package br.com.guizzo.projectbasic.modules.company.domain.dto;

import br.com.guizzo.projectbasic.shared.domain.dto.PaginationRequestDTO;
import br.com.guizzo.projectbasic.shared.domain.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class CompanyFindManyDTO extends PaginationRequestDTO {
    private String search;
    private String name;
    private String tradeName;
    private String email;
    private Long organizationId;
    private List<Status> status;
    private String state;
    private String city;
    private String street;
    private String neighborhood;
    private Boolean includeDeleted = false;

    public CompanyFindManyDTO() {
        super();
        this.includeDeleted = false;
    }
}
