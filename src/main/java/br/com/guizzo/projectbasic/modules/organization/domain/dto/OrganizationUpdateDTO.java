package br.com.guizzo.projectbasic.modules.organization.domain.dto;

import br.com.guizzo.projectbasic.modules.address.domain.dto.AddressUpdateDTO;
import br.com.guizzo.projectbasic.shared.domain.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrganizationUpdateDTO {
    private String name;

    private String tradeName;

    private String email;

    private Status status;

    private AddressUpdateDTO address;
}
