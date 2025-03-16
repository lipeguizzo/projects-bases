package br.com.guizzo.projectbasic.modules.user.validators;

import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.modules.user.repositories.UserRepository;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserExistingValidator {

    private static UserRepository userRepository;

    @Autowired
    public UserExistingValidator(UserRepository userRepository) {
        UserExistingValidator.userRepository = userRepository;
    }

    public static void validate(Long userId){
        User user = userRepository.findFirstByIdAndDeletedAtIsNull(userId);
        if (user == null) throw new NotFoundException("Usuário não encontrado!");
    }
}
