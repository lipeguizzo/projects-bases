package br.com.guizzo.projectbasic.modules.user.services;

import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.modules.user.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserFindByEmailService {
    @Autowired
    private UserRepository userRepository;

    public User execute(String email) {
        return this.userRepository.findFirstByEmailAndDeletedAtIsNull(email);
    }
}
