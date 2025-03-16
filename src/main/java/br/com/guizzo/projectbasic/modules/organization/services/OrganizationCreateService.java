package br.com.guizzo.projectbasic.modules.organization.services;

import br.com.guizzo.projectbasic.modules.address.domain.entities.Address;
import br.com.guizzo.projectbasic.modules.address.repositories.AddressRepository;
import br.com.guizzo.projectbasic.modules.organization.domain.dto.OrganizationCreateDTO;
import br.com.guizzo.projectbasic.modules.organization.domain.entities.Organization;
import br.com.guizzo.projectbasic.modules.organization.repositories.OrganizationRepository;
import br.com.guizzo.projectbasic.shared.exceptions.ConflictException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrganizationCreateService {

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private AddressRepository addressRepository;

    public Organization execute(OrganizationCreateDTO dto){

        Organization organization = organizationRepository
                .findFirstByNameOrEmailAndDeletedAtIsNull(dto.getName(), dto.getEmail());

        if(organization != null) throw new ConflictException("Nome ou e-mail da organização já cadastrado!");

        Organization createdOrganization = organizationRepository.save(Organization.builder()
                .name(dto.getName())
                .tradeName(dto.getTradeName())
                .email(dto.getEmail())
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

        return createdOrganization;
    }

}
