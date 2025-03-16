package br.com.guizzo.projectbasic.modules.role.services;

import br.com.guizzo.projectbasic.modules.role.domain.entities.Ability;
import br.com.guizzo.projectbasic.modules.role.domain.entities.Role;
import br.com.guizzo.projectbasic.modules.role.domain.entities.RoleAbility;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleAbilityRepository;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleRepository;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.utils.ArrayUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RoleFindAbilitiesService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RoleAbilityRepository roleAbilityRepository;

    public List<Ability> execute(Long id, User userRequest){

        Role role = ArrayUtil.getFirstItem(
                roleRepository.findByIdAndDeletedAtIsNullAndIsDefaultAndOrganizationAndCompany(
                        id,
                        userRequest.getOrganization() != null ? userRequest.getOrganization().getId() : null,
                        userRequest.getCompany() != null ? userRequest.getCompany().getId() : null
                )
        );
        if (role == null) throw new NotFoundException("Perfil não encontrado!");

        List<RoleAbility> roleAbilities = roleAbilityRepository.findByRoleId(role.getId());

        List<Ability> abilities = new ArrayList<>();

        roleAbilities.forEach(roleAbility -> abilities.add(roleAbility.getAbility()));
        
        return abilities;
    }

}
