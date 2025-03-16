package br.com.guizzo.projectbasic.modules.organization.services;

import br.com.guizzo.projectbasic.modules.organization.domain.entities.Organization;
import br.com.guizzo.projectbasic.modules.organization.repositories.OrganizationRepository;
import br.com.guizzo.projectbasic.modules.storedfile.services.StoredFileDeleteService;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.validators.UserOrganizationValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrganizationDeleteAvatarService {

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private StoredFileDeleteService storedFileDeleteService;


    public Organization execute(Long id, User userRequest) {

        Organization organization = organizationRepository.findFirstByIdAndDeletedAtIsNull(id);
        if (organization == null) throw new NotFoundException("Organização não encontrada!");
        
        UserOrganizationValidator.validate(id, userRequest);

        String uuid = organization.getAvatar().getUuid();

        organization.setAvatar(null);
        organizationRepository.save(organization);

        storedFileDeleteService.execute(uuid);

        return organization;

    }

}
