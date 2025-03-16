package br.com.guizzo.projectbasic.modules.role.services;

import br.com.guizzo.projectbasic.modules.role.domain.entities.Role;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleRepository;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.utils.ArrayUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleFindOneService {

    @Autowired
    private RoleRepository roleRepository;

    public Role execute(Long id, User userRequest){

        Role role = ArrayUtil.getFirstItem(
                roleRepository.findByIdAndDeletedAtIsNullAndIsDefaultAndOrganizationAndCompany(
                    id,
                    userRequest.getOrganization() != null ? userRequest.getOrganization().getId() : null,
                    userRequest.getCompany() != null ? userRequest.getCompany().getId() : null
                )
        );
        if (role == null) throw new NotFoundException("Perfil não encontrado!");
        
        return role;
    }

}
