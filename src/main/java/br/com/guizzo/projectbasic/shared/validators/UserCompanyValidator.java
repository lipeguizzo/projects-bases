package br.com.guizzo.projectbasic.shared.validators;

import br.com.guizzo.projectbasic.modules.company.domain.entities.Company;
import br.com.guizzo.projectbasic.modules.company.repositories.CompanyRepository;
import br.com.guizzo.projectbasic.modules.role.domain.enums.RoleReferences;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.exceptions.UnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class UserCompanyValidator {

    private static CompanyRepository companyRepository;

    @Autowired
    public UserCompanyValidator(CompanyRepository companyRepository) {
        UserCompanyValidator.companyRepository = companyRepository;
    }

    public static void validate(Long companyId, User userRequest){
        if (userRequest == null) throw new UnauthorizedException("Usuário não encontrado!");

        Company company = companyRepository.findFirstByIdAndDeletedAtIsNull(companyId);

        if (company == null) throw new NotFoundException("Empresa não encontrada!");

        if (userRequest.getRole().getReference() == RoleReferences.ADMIN) return;

        if (userRequest.getRole().getReference() == RoleReferences.ADMIN_ORGANIZATION &&
            Objects.equals(userRequest.getOrganization().getId(), company.getOrganization().getId())
        ) return;

        if (!Objects.equals(userRequest.getCompany().getId(), companyId))
            throw new UnauthorizedException("Usuário sem permissão nessa empresa");
    }
}
