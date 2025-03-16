package br.com.guizzo.projectbasic.modules.role.services;

import br.com.guizzo.projectbasic.modules.company.repositories.CompanyRepository;
import br.com.guizzo.projectbasic.modules.organization.repositories.OrganizationRepository;
import br.com.guizzo.projectbasic.modules.role.domain.dto.RoleUpdateDTO;
import br.com.guizzo.projectbasic.modules.role.domain.entities.Role;
import br.com.guizzo.projectbasic.modules.role.domain.entities.RoleAbility;
import br.com.guizzo.projectbasic.modules.role.domain.entities.RoleAbilityId;
import br.com.guizzo.projectbasic.modules.role.repositories.AbilityRepository;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleAbilityRepository;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleRepository;
import br.com.guizzo.projectbasic.modules.role.validators.RoleDefaultValidator;
import br.com.guizzo.projectbasic.modules.role.validators.RoleReferenceValidator;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.ConflictException;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.utils.ArrayUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class RoleUpdateService {

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

    public Role execute(Long id, RoleUpdateDTO dto, User userRequest){

        Role role = ArrayUtil.getFirstItem(
                roleRepository.findByIdAndDeletedAtIsNullAndOrganizationIdAndCompanyId(
                        id,
                        userRequest.getOrganization() != null ? userRequest.getOrganization().getId() : null,
                        userRequest.getCompany() != null ? userRequest.getCompany().getId() : null
                )
        );

        if(role == null) throw new NotFoundException("Perfil não encontrado!");

        RoleDefaultValidator.validate(role.getId());

        if(dto.getReference() != null)
            RoleReferenceValidator.validate(dto.getReference(), userRequest);

        Role existingRole = ArrayUtil.getFirstItem(
                roleRepository.findByNameAndDeletedAtIsNull(dto.getName())
        );

        if(existingRole != null && !Objects.equals(existingRole.getId(), id))
            throw new ConflictException("Perfil já cadastrado!");

        if (dto.getName() != null) role.setName(dto.getName());
        if (dto.getIsDefault() != null) role.setIsDefault(dto.getIsDefault());
        if (dto.getReference() != null) role.setReference(dto.getReference());
        if (dto.getStatus() != null) role.setStatus(dto.getStatus());

        if(dto.getAbilitiesIds() != null) {

            List<RoleAbility> oldRoleAbilities = roleAbilityRepository.findByRoleId(role.getId());
            roleAbilityRepository.deleteAll(oldRoleAbilities);

            List<RoleAbility> newRoleAbilities = dto.getAbilitiesIds().stream()
                    .map(abilityId -> RoleAbility.builder()
                            .id(new RoleAbilityId())
                            .ability(abilityRepository.findFirstByIdAndDeletedAtIsNull(abilityId))
                            .role(role)
                            .build()
                    ).toList();
            roleAbilityRepository.saveAll(newRoleAbilities);
        }

        roleRepository.save(role);

        return role;
    }

}
