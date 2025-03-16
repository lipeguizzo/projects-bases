package br.com.guizzo.projectbasic.modules.auth.services;

import br.com.guizzo.projectbasic.modules.auth.domain.dto.AuthLoginDTO;
import br.com.guizzo.projectbasic.modules.auth.domain.dto.AuthLoginResponseDTO;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.modules.user.repositories.UserRepository;
import br.com.guizzo.projectbasic.shared.domain.enums.PeriodExpiration;
import br.com.guizzo.projectbasic.shared.exceptions.ConflictException;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.services.TokenSignService;
import br.com.guizzo.projectbasic.shared.validators.StatusValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthLoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenSignService tokenSignService;

    @Value("${JWT_REFRESH_SECRET}")
    private String refreshSecret;

    public AuthLoginResponseDTO execute(AuthLoginDTO dto){

        User user = userRepository.findFirstByEmailAndDeletedAtIsNull(dto.getEmail());
        if(user == null) throw new NotFoundException("E-mail incorreto!");

        boolean isPasswordMatch = new BCryptPasswordEncoder().matches(dto.getPassword(),user.getPassword());
        if(!isPasswordMatch) throw new ConflictException("Senha incorreta!");

        StatusValidator.validate(user.getStatus());

        String token = tokenSignService.execute(user);
        String refreshToken = tokenSignService.execute(user, 10, PeriodExpiration.DAY, refreshSecret);

        return new AuthLoginResponseDTO(
                user,
                token,
                refreshToken
        );

    }
}
