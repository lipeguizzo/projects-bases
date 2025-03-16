package br.com.guizzo.projectbasic.modules.role.validators;

import br.com.guizzo.projectbasic.modules.role.domain.enums.RoleReferences;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleRepository;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.UnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class RoleReferenceValidator {

    private static RoleRepository roleRepository;

    @Autowired
    public RoleReferenceValidator(RoleRepository roleRepository) {
        RoleReferenceValidator.roleRepository = roleRepository;
    }

    public static void validate(RoleReferences reference, User userRequest){
        if (userRequest == null) throw new UnauthorizedException("Usuário não encontrado!");

        boolean isAdmin = userRequest.getRole().getReference() == RoleReferences.ADMIN;
        boolean isAdminOrganization = userRequest.getRole().getReference() == RoleReferences.ADMIN_ORGANIZATION;
        boolean isAdminCompany = userRequest.getRole().getReference() == RoleReferences.ADMIN_COMPANY;

        if (reference == RoleReferences.ADMIN && isAdmin) return;

        if (reference == RoleReferences.ADMIN_ORGANIZATION && isAdmin) return;

        if (reference == RoleReferences.ADMIN_COMPANY && (isAdmin || isAdminOrganization) ) return;

        if (reference == RoleReferences.CLIENT && (isAdmin || isAdminOrganization || isAdminCompany) ) return;

        if (!Objects.equals(userRequest.getRole().getReference(), reference))
            throw new UnauthorizedException("Usuário sem permissão nesse perfil!");
    }
}
