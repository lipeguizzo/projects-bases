package br.com.guizzo.projectbasic.modules.role.validators;

import br.com.guizzo.projectbasic.modules.role.domain.entities.Role;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleRepository;
import br.com.guizzo.projectbasic.shared.exceptions.ConflictException;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RoleDefaultValidator {

    private static RoleRepository roleRepository;

    @Autowired
    public RoleDefaultValidator(
            RoleRepository roleRepository
    ) {
        RoleDefaultValidator.roleRepository = roleRepository;
    }

    public static void validate(Long roleId){
        Role role = roleRepository.findFirstByIdAndDeletedAtIsNull(roleId);
        if (role == null) throw new NotFoundException("Perfil não encontrada!");

        if (role.getIsDefault()) throw new ConflictException("Perfil padrão, não possível atualizar ou deletar!");

    }
}
