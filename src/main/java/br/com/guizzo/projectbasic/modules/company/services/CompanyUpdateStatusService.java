package br.com.guizzo.projectbasic.modules.company.services;

import br.com.guizzo.projectbasic.modules.company.domain.dto.CompanyUpdateStatusDTO;
import br.com.guizzo.projectbasic.modules.company.domain.entities.Company;
import br.com.guizzo.projectbasic.modules.company.repositories.CompanyRepository;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.validators.UserCompanyValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyUpdateStatusService {

    @Autowired
    private CompanyRepository companyRepository;

    public Company execute(Long id, CompanyUpdateStatusDTO dto, User userRequest){

        Company company = companyRepository.findFirstByIdAndDeletedAtIsNull(id);
        if (company == null) throw new NotFoundException("Empresa não encontrada!");

        UserCompanyValidator.validate(id, userRequest);

        company.setStatus(dto.getStatus());

        companyRepository.save(company);

        return company;
    }

}
