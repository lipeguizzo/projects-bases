package br.com.guizzo.projectbasic.modules.company.services;

import br.com.guizzo.projectbasic.modules.address.domain.entities.Address;
import br.com.guizzo.projectbasic.modules.address.repositories.AddressRepository;
import br.com.guizzo.projectbasic.modules.company.domain.dto.CompanyCreateDTO;
import br.com.guizzo.projectbasic.modules.company.domain.entities.Company;
import br.com.guizzo.projectbasic.modules.company.repositories.CompanyRepository;
import br.com.guizzo.projectbasic.modules.organization.repositories.OrganizationRepository;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.ConflictException;
import br.com.guizzo.projectbasic.shared.validators.UserOrganizationValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyCreateService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private AddressRepository addressRepository;

    public Company execute(CompanyCreateDTO dto, User userRequest){

        Company company = companyRepository
                .findFirstByNameOrEmailAndDeletedAtIsNull(dto.getName(), dto.getEmail());

        if(company != null) throw new ConflictException("Nome ou e-mail da empresa já cadastrado!");

        UserOrganizationValidator.validate(dto.getOrganizationId(), userRequest);

        Company createdCompany = companyRepository.save(Company.builder()
                .name(dto.getName())
                .tradeName(dto.getTradeName())
                .email(dto.getEmail())
                .organization(organizationRepository.findFirstByIdAndDeletedAtIsNull(dto.getOrganizationId()))
                .status(dto.getStatus())
                .address(addressRepository.save(Address.builder()
                        .state(dto.getAddress().getState())
                        .city(dto.getAddress().getCity())
                        .street(dto.getAddress().getStreet())
                        .neighborhood(dto.getAddress().getNeighborhood())
                        .complement(dto.getAddress().getComplement())
                        .build()))
                .build()
        );

        return createdCompany;
    }

}
