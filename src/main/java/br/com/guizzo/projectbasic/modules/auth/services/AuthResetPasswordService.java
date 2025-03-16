package br.com.guizzo.projectbasic.modules.auth.services;

import br.com.guizzo.projectbasic.modules.auth.domain.dto.AuthResetPasswordDTO;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.modules.user.repositories.UserRepository;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.services.TokenVerifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthResetPasswordService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenVerifyService tokenVerifyService;

    @Value("${JWT_SECRET}")
    private String secret;

    public User execute(AuthResetPasswordDTO dto){

        String payload = tokenVerifyService.execute(dto.getToken(), secret);

        User user = userRepository.findFirstByEmailAndDeletedAtIsNull(payload);
        if(user == null) throw new NotFoundException("Usuário não encontrado!");

        user.setPassword(new BCryptPasswordEncoder().encode(dto.getPassword()));
        userRepository.save(user);

        return user;

    }
}
