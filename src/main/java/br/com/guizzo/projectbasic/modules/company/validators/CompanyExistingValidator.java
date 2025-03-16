package br.com.guizzo.projectbasic.modules.company.validators;

import br.com.guizzo.projectbasic.modules.company.domain.entities.Company;
import br.com.guizzo.projectbasic.modules.company.repositories.CompanyRepository;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CompanyExistingValidator {

    private static CompanyRepository companyRepository;

    @Autowired
    public CompanyExistingValidator(CompanyRepository companyRepository) {
        CompanyExistingValidator.companyRepository = companyRepository;
    }

    public static void validate(Long companyId){
        Company company = companyRepository.findFirstByIdAndDeletedAtIsNull(companyId);
        if (company == null) throw new NotFoundException("Empresa não encontrada!");
    }
}
