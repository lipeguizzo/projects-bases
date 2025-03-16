package br.com.guizzo.projectbasic.modules.company.services;

import br.com.guizzo.projectbasic.modules.address.repositories.AddressRepository;
import br.com.guizzo.projectbasic.modules.company.domain.dto.CompanyUpdateDTO;
import br.com.guizzo.projectbasic.modules.company.domain.entities.Company;
import br.com.guizzo.projectbasic.modules.company.repositories.CompanyRepository;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.ConflictException;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.validators.UserCompanyValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class CompanyUpdateService {

    @Autowired
    private CompanyRepository companyRepository;


    @Autowired
    private AddressRepository addressRepository;

    public Company execute(Long id, CompanyUpdateDTO dto, User userRequest){

        Company company = companyRepository.findFirstByIdAndDeletedAtIsNull(id);
        if (company == null) throw new NotFoundException("Empresa não encontrada!");

        Company existingCompany = companyRepository
                .findFirstByNameOrEmailAndDeletedAtIsNull(dto.getName(), dto.getEmail());

        if(existingCompany != null && !Objects.equals(existingCompany.getId(), id))
            throw new ConflictException("Empresa já cadastrada!");

        UserCompanyValidator.validate(id, userRequest);

        if (dto.getName() != null) company.setName(dto.getName());
        if (dto.getTradeName() != null) company.setTradeName(dto.getTradeName());
        if (dto.getEmail() != null) company.setEmail(dto.getEmail());
        if (dto.getStatus() != null) company.setStatus(dto.getStatus());

        if (dto.getAddress() != null) {
            if (dto.getAddress().getState() != null) company.getAddress().setState(dto.getAddress().getState());
            if (dto.getAddress().getCity() != null) company.getAddress().setCity(dto.getAddress().getCity());
            if (dto.getAddress().getStreet() != null) company.getAddress().setStreet(dto.getAddress().getStreet());
            if (dto.getAddress().getNeighborhood() != null) company.getAddress().setNeighborhood(dto.getAddress().getNeighborhood());
            if (dto.getAddress().getComplement() != null) company.getAddress().setComplement(dto.getAddress().getComplement());
        };

        companyRepository.save(company);

        return company;
    }

}
