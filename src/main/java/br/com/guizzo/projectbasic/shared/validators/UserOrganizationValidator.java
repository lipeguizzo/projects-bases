package br.com.guizzo.projectbasic.shared.validators;

import br.com.guizzo.projectbasic.modules.organization.domain.entities.Organization;
import br.com.guizzo.projectbasic.modules.organization.repositories.OrganizationRepository;
import br.com.guizzo.projectbasic.modules.role.domain.enums.RoleReferences;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.exceptions.UnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class UserOrganizationValidator {

    private static OrganizationRepository organizationRepository;

    @Autowired
    public UserOrganizationValidator(OrganizationRepository organizationRepository) {
        UserOrganizationValidator.organizationRepository = organizationRepository;
    }

    public static void validate(Long organizationId, User userRequest){
        if (userRequest == null) throw new UnauthorizedException("Usuário não encontrado!");

        Organization organization = organizationRepository.findFirstByIdAndDeletedAtIsNull(organizationId);

        if (organization == null) throw new NotFoundException("Organização não encontrada!");

        if (userRequest.getRole().getReference() == RoleReferences.ADMIN) return;

        if (!Objects.equals(userRequest.getOrganization().getId(), organizationId))
            throw new UnauthorizedException("Usuário sem permissão nessa organização");
    }
}
