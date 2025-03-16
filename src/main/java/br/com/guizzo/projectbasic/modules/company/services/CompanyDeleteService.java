package br.com.guizzo.projectbasic.modules.company.services;

import br.com.guizzo.projectbasic.modules.company.domain.entities.Company;
import br.com.guizzo.projectbasic.modules.company.repositories.CompanyRepository;
import br.com.guizzo.projectbasic.modules.company.validators.CompanyDeleteValidator;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.validators.UserCompanyValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyDeleteService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CompanyDeleteAvatarService companyDeleteAvatarService ;

    public Company execute(Long id, User userRequest){

        Company company = companyRepository.findFirstByIdAndDeletedAtIsNull(id);
        if (company == null) throw new NotFoundException("Empresa não encontrada!");

        UserCompanyValidator.validate(id, userRequest);

        CompanyDeleteValidator.validate(id);

        if (company.getAvatar() != null){
            companyDeleteAvatarService.execute(id, userRequest);
            company.setAvatar(null);
        }

        company.softDelete();
        companyRepository.save(company);

        return company;
    }

}
