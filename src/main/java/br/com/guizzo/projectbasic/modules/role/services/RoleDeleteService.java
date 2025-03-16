package br.com.guizzo.projectbasic.modules.role.services;

import br.com.guizzo.projectbasic.modules.role.domain.entities.Role;
import br.com.guizzo.projectbasic.modules.role.domain.entities.RoleAbility;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleAbilityRepository;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleRepository;
import br.com.guizzo.projectbasic.modules.role.validators.RoleDefaultValidator;
import br.com.guizzo.projectbasic.modules.role.validators.RoleDeleteValidator;
import br.com.guizzo.projectbasic.modules.role.validators.RoleReferenceValidator;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.utils.ArrayUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleDeleteService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RoleAbilityRepository roleAbilityRepository;

    public Role execute(Long id, User userRequest){

        Role role = ArrayUtil.getFirstItem(
                roleRepository.findByIdAndDeletedAtIsNullAndOrganizationIdAndCompanyId(
                    id,
                    userRequest.getOrganization() != null ? userRequest.getOrganization().getId() : null,
                    userRequest.getCompany() != null ? userRequest.getCompany().getId() : null
                )
        );
        if (role == null) throw new NotFoundException("Perfil não encontrada!");

        RoleDefaultValidator.validate(role.getId());

        RoleReferenceValidator.validate(role.getReference(), userRequest);

        RoleDeleteValidator.validate(id);

        List<RoleAbility> roleAbilities = roleAbilityRepository.findByRoleId(role.getId());
        for (RoleAbility roleAbility : roleAbilities) {
            roleAbilityRepository.delete(roleAbility);
        }

        role.softDelete();
        roleRepository.save(role);

        return role;
    }

}
