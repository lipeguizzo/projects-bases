package br.com.guizzo.projectbasic.shared.validators;

import br.com.guizzo.projectbasic.modules.role.domain.entities.Role;
import br.com.guizzo.projectbasic.modules.role.domain.enums.RoleReferences;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleRepository;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.exceptions.UnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class UserRoleValidator {

    private static RoleRepository roleRepository;

    @Autowired
    public UserRoleValidator(RoleRepository roleRepository) {
        UserRoleValidator.roleRepository = roleRepository;
    }

    public static void validate(Long roleId, User userRequest){
        if (userRequest == null) throw new UnauthorizedException("Usuário não encontrado!");

        Role role = roleRepository.findFirstByIdAndDeletedAtIsNull(roleId);

        if (role == null) throw new NotFoundException("Perfil não encontrado!");

        boolean isAdmin = userRequest.getRole().getReference() == RoleReferences.ADMIN;
        boolean isAdminOrganization = userRequest.getRole().getReference() == RoleReferences.ADMIN_ORGANIZATION;
        boolean isAdminCompany = userRequest.getRole().getReference() == RoleReferences.ADMIN_COMPANY;

        if (role.getReference() == RoleReferences.ADMIN && isAdmin) return;

        if (role.getReference() == RoleReferences.ADMIN_ORGANIZATION && isAdmin) return;

        if (role.getReference() == RoleReferences.ADMIN_COMPANY && (isAdmin || isAdminOrganization) ) return;

        if (role.getReference() == RoleReferences.CLIENT && (isAdmin || isAdminOrganization || isAdminCompany) ) return;

        if (!Objects.equals(userRequest.getRole().getId(), roleId))
            throw new UnauthorizedException("Usuário sem permissão nesse perfil!");
    }
}
