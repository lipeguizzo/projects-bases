package br.com.guizzo.projectbasic.modules.organization.services;

import br.com.guizzo.projectbasic.modules.organization.domain.entities.Organization;
import br.com.guizzo.projectbasic.modules.organization.repositories.OrganizationRepository;
import br.com.guizzo.projectbasic.modules.organization.validators.OrganizationDeleteValidator;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.validators.UserOrganizationValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrganizationDeleteService {

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private OrganizationDeleteAvatarService organizationDeleteAvatarService;

    public Organization execute(Long id, User userRequest){

        Organization organization = organizationRepository.findFirstByIdAndDeletedAtIsNull(id);
        if (organization == null) throw new NotFoundException("Organização não encontrada!");

        UserOrganizationValidator.validate(id, userRequest);

        OrganizationDeleteValidator.validate(id);


        if (organization.getAvatar() != null) {
            organizationDeleteAvatarService.execute(id, userRequest);
            organization.setAvatar(null);
        }

        organization.softDelete();
        organizationRepository.save(organization);

        return organization;
    }

}
