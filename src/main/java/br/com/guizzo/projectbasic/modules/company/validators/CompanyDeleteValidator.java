package br.com.guizzo.projectbasic.modules.company.validators;

import br.com.guizzo.projectbasic.modules.company.domain.entities.Company;
import br.com.guizzo.projectbasic.modules.company.repositories.CompanyRepository;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleRepository;
import br.com.guizzo.projectbasic.modules.user.repositories.UserRepository;
import br.com.guizzo.projectbasic.shared.exceptions.ConflictException;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CompanyDeleteValidator {

    private static CompanyRepository companyRepository;
    private static UserRepository userRepository;
    private static RoleRepository roleRepository;

    @Autowired
    public CompanyDeleteValidator(
            CompanyRepository companyRepository,
            UserRepository userRepository,
            RoleRepository roleRepository
    ) {
        CompanyDeleteValidator.companyRepository = companyRepository;
        CompanyDeleteValidator.userRepository = userRepository;
        CompanyDeleteValidator.roleRepository = roleRepository;
    }

    public static void validate(Long companyId){
        Company company = companyRepository.findFirstByIdAndDeletedAtIsNull(companyId);
        if (company == null) throw new NotFoundException("Empresa não encontrada!");

        Boolean hasUsers = userRepository.existsByCompanyIdAndDeletedAtIsNull(companyId);
        if (hasUsers) throw new ConflictException("Não foi possível deletar empresa por que possui usuários vinculados!");

        Boolean hasRoles = roleRepository.existsByCompanyIdAndDeletedAtIsNull(companyId);
        if (hasRoles) throw new ConflictException("Não foi possível deletar empresa por que possui perfis vinculados!");

    }
}
