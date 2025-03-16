package br.com.guizzo.projectbasic.modules.role.services;

import br.com.guizzo.projectbasic.modules.role.domain.dto.RoleUpdateStatusDTO;
import br.com.guizzo.projectbasic.modules.role.domain.entities.Role;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleRepository;
import br.com.guizzo.projectbasic.modules.role.validators.RoleDefaultValidator;
import br.com.guizzo.projectbasic.modules.role.validators.RoleReferenceValidator;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.utils.ArrayUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleUpdateStatusService {

    @Autowired
    private RoleRepository roleRepository;

    public Role execute(Long id, RoleUpdateStatusDTO dto, User userRequest){

        Role role = ArrayUtil.getFirstItem(roleRepository
                .findByIdAndDeletedAtIsNullAndOrganizationIdAndCompanyId(
                        id,
                        userRequest.getOrganization() != null ? userRequest.getOrganization().getId() : null,
                        userRequest.getCompany() != null ? userRequest.getCompany().getId() : null
                )
        );

        if(role == null) throw new NotFoundException("Perfil não encontrado!");

        RoleDefaultValidator.validate(role.getId());

        RoleReferenceValidator.validate(role.getReference(), userRequest);

        role.setStatus(dto.getStatus());

        roleRepository.save(role);

        return role;
    }

}
