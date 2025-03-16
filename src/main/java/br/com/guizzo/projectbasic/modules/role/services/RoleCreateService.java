package br.com.guizzo.projectbasic.modules.role.services;

import br.com.guizzo.projectbasic.modules.company.repositories.CompanyRepository;
import br.com.guizzo.projectbasic.modules.organization.repositories.OrganizationRepository;
import br.com.guizzo.projectbasic.modules.role.domain.dto.RoleCreateDTO;
import br.com.guizzo.projectbasic.modules.role.domain.entities.Role;
import br.com.guizzo.projectbasic.modules.role.domain.entities.RoleAbility;
import br.com.guizzo.projectbasic.modules.role.domain.entities.RoleAbilityId;
import br.com.guizzo.projectbasic.modules.role.repositories.AbilityRepository;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleAbilityRepository;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleRepository;
import br.com.guizzo.projectbasic.modules.role.validators.RoleReferenceValidator;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.ConflictException;
import br.com.guizzo.projectbasic.shared.utils.ArrayUtil;
import br.com.guizzo.projectbasic.shared.validators.UserCompanyValidator;
import br.com.guizzo.projectbasic.shared.validators.UserOrganizationValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleCreateService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AbilityRepository abilityRepository;

    @Autowired
    private RoleAbilityRepository roleAbilityRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    public Role execute(RoleCreateDTO dto, User userRequest){

        Role role = ArrayUtil.getFirstItem(
                roleRepository.findByNameAndDeletedAtIsNullAndOrganizationIdAndCompanyId(
                        dto.getName(),
                        dto.getOrganizationId() != null ? dto.getOrganizationId() : null,
                        dto.getCompanyId() != null ? dto.getCompanyId() : null
                )
        );

        if(role != null) throw new ConflictException("Perfil já cadastrado!");

        if(dto.getReference() != null)
            RoleReferenceValidator.validate(dto.getReference(), userRequest);

        if(dto.getOrganizationId() != null)
            UserOrganizationValidator.validate(dto.getOrganizationId(), userRequest);

        if(dto.getCompanyId() != null)
            UserCompanyValidator.validate(dto.getCompanyId(), userRequest);

        Role createdRole = roleRepository.save(Role.builder()
                .name(dto.getName())
                .isDefault(dto.getIsDefault())
                .reference(dto.getReference())
                .organization(dto.getOrganizationId() != null ?
                        organizationRepository.findFirstByIdAndDeletedAtIsNull(dto.getOrganizationId()) : null)
                .company(dto.getCompanyId() != null ?
                        companyRepository.findFirstByIdAndDeletedAtIsNull(dto.getCompanyId()) : null)
                .status(dto.getStatus())
                .build()
        );

        List<RoleAbility> roleAbilities = dto.getAbilitiesIds().stream()
                .map(abilityId -> RoleAbility.builder()
                        .id(new RoleAbilityId())
                        .ability(abilityRepository.findFirstByIdAndDeletedAtIsNull(abilityId))
                        .role(createdRole)
                        .build()
                ).toList();

        roleAbilityRepository.saveAll(roleAbilities);

        return createdRole;
    }

}
