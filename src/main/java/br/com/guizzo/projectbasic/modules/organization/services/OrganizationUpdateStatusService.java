package br.com.guizzo.projectbasic.modules.organization.services;

import br.com.guizzo.projectbasic.modules.organization.domain.dto.OrganizationUpdateStatusDTO;
import br.com.guizzo.projectbasic.modules.organization.domain.entities.Organization;
import br.com.guizzo.projectbasic.modules.organization.repositories.OrganizationRepository;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.validators.UserOrganizationValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrganizationUpdateStatusService {

    @Autowired
    private OrganizationRepository organizationRepository;

    public Organization execute(Long id, OrganizationUpdateStatusDTO dto, User userRequest){

        Organization organization = organizationRepository.findFirstByIdAndDeletedAtIsNull(id);
        if (organization == null) throw new NotFoundException("Organização não encontrada!");

        UserOrganizationValidator.validate(id, userRequest);

        organization.setStatus(dto.getStatus());

        organizationRepository.save(organization);

        return organization;
    }

}
