package br.com.guizzo.projectbasic.modules.role.validators;

import br.com.guizzo.projectbasic.modules.role.domain.entities.Role;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleRepository;
import br.com.guizzo.projectbasic.modules.user.repositories.UserRepository;
import br.com.guizzo.projectbasic.shared.exceptions.ConflictException;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RoleDeleteValidator {

    private static UserRepository userRepository;
    private static RoleRepository roleRepository;

    @Autowired
    public RoleDeleteValidator(
            UserRepository userRepository,
            RoleRepository roleRepository
    ) {
        RoleDeleteValidator.userRepository = userRepository;
        RoleDeleteValidator.roleRepository = roleRepository;
    }

    public static void validate(Long roleId){
        Role role = roleRepository.findFirstByIdAndDeletedAtIsNull(roleId);
        if (role == null) throw new NotFoundException("Perfil não encontrado!");

        Boolean hasUsers = userRepository.existsByRoleIdAndDeletedAtIsNull(roleId);
        if (hasUsers) throw new ConflictException("Não foi possível deletar perfil por que possui usuários vinculados!");

    }
}
