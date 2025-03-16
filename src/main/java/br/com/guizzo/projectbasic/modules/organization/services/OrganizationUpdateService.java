package br.com.guizzo.projectbasic.modules.organization.services;

import br.com.guizzo.projectbasic.modules.address.repositories.AddressRepository;
import br.com.guizzo.projectbasic.modules.organization.domain.dto.OrganizationUpdateDTO;
import br.com.guizzo.projectbasic.modules.organization.domain.entities.Organization;
import br.com.guizzo.projectbasic.modules.organization.repositories.OrganizationRepository;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.ConflictException;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.validators.UserOrganizationValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class OrganizationUpdateService {

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private AddressRepository addressRepository;

    public Organization execute(Long id, OrganizationUpdateDTO dto, User userRequest){

        Organization organization = organizationRepository.findFirstByIdAndDeletedAtIsNull(id);
        if (organization == null) throw new NotFoundException("Organização não encontrada!");

        Organization existingOrganization = organizationRepository
                .findFirstByNameOrEmailAndDeletedAtIsNull(dto.getName(), dto.getEmail());

        if(existingOrganization != null && !Objects.equals(existingOrganization.getId(), id))
            throw new ConflictException("Organização já cadastrada!");

        UserOrganizationValidator.validate(id, userRequest);

        if (dto.getName() != null) organization.setName(dto.getName());
        if (dto.getTradeName() != null) organization.setTradeName(dto.getTradeName());
        if (dto.getEmail() != null) organization.setEmail(dto.getEmail());
        if (dto.getStatus() != null) organization.setStatus(dto.getStatus());

        if (dto.getAddress() != null) {
            if (dto.getAddress().getState() != null) organization.getAddress().setState(dto.getAddress().getState());
            if (dto.getAddress().getCity() != null) organization.getAddress().setCity(dto.getAddress().getCity());
            if (dto.getAddress().getStreet() != null) organization.getAddress().setStreet(dto.getAddress().getStreet());
            if (dto.getAddress().getNeighborhood() != null) organization.getAddress().setNeighborhood(dto.getAddress().getNeighborhood());
            if (dto.getAddress().getComplement() != null) organization.getAddress().setComplement(dto.getAddress().getComplement());
        };

        organizationRepository.save(organization);

        return organization;
    }

}
