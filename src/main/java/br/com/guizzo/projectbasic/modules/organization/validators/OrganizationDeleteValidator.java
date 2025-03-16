package br.com.guizzo.projectbasic.modules.organization.validators;

import br.com.guizzo.projectbasic.modules.company.repositories.CompanyRepository;
import br.com.guizzo.projectbasic.modules.organization.domain.entities.Organization;
import br.com.guizzo.projectbasic.modules.organization.repositories.OrganizationRepository;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleRepository;
import br.com.guizzo.projectbasic.modules.user.repositories.UserRepository;
import br.com.guizzo.projectbasic.shared.exceptions.ConflictException;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrganizationDeleteValidator {

    private static OrganizationRepository organizationRepository;
    private static CompanyRepository companyRepository;
    private static UserRepository userRepository;
    private static RoleRepository roleRepository;

    @Autowired
    public OrganizationDeleteValidator(
            OrganizationRepository organizationRepository,
            CompanyRepository companyRepository,
            UserRepository userRepository,
            RoleRepository roleRepository
    ) {
        OrganizationDeleteValidator.organizationRepository = organizationRepository;
        OrganizationDeleteValidator.companyRepository = companyRepository;
        OrganizationDeleteValidator.userRepository = userRepository;
        OrganizationDeleteValidator.roleRepository = roleRepository;
    }

    public static void validate(Long organizationId){
        Organization organization = organizationRepository.findFirstByIdAndDeletedAtIsNull(organizationId);
        if (organization == null) throw new NotFoundException("Organização não encontrada!");

        Boolean hasCompanies = companyRepository.existsByOrganizationIdAndDeletedAtIsNull(organizationId);
        if (hasCompanies) throw new ConflictException("Não foi possível deletar organização por que possui empresas vinculadas!");

        Boolean hasUsers = userRepository.existsByOrganizationIdAndDeletedAtIsNull(organizationId);
        if (hasUsers) throw new ConflictException("Não foi possível deletar organização por que possui usuários vinculados!");

        Boolean hasRoles = roleRepository.existsByOrganizationIdAndDeletedAtIsNull(organizationId);
        if (hasRoles) throw new ConflictException("Não foi possível deletar organização por que possui perfis vinculados!");

    }
}
