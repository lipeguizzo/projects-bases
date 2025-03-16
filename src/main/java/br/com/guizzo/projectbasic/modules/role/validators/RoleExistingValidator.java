package br.com.guizzo.projectbasic.modules.role.validators;

import br.com.guizzo.projectbasic.modules.role.domain.entities.Role;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleRepository;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RoleExistingValidator {

    private static RoleRepository roleRepository;

    @Autowired
    public RoleExistingValidator(RoleRepository roleRepository) {
        RoleExistingValidator.roleRepository = roleRepository;
    }

    public static void validate(Long roleId){
        Role role = roleRepository.findFirstByIdAndDeletedAtIsNull(roleId);
        if (role == null) throw new NotFoundException("Perfil não encontrado!");
    }
}
