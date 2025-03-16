package br.com.guizzo.projectbasic.modules.organization.validators;

import br.com.guizzo.projectbasic.modules.organization.domain.entities.Organization;
import br.com.guizzo.projectbasic.modules.organization.repositories.OrganizationRepository;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrganizationExistingValidator {

    private static OrganizationRepository organizationRepository;

    @Autowired
    public OrganizationExistingValidator(OrganizationRepository organizationRepository) {
        OrganizationExistingValidator.organizationRepository = organizationRepository;
    }

    public static void validate(Long organizationId){
        Organization organization = organizationRepository.findFirstByIdAndDeletedAtIsNull(organizationId);
        if (organization == null) throw new NotFoundException("Organização não encontrada!");
    }
}
