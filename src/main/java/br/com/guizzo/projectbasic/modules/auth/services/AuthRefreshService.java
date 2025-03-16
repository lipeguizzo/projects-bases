package br.com.guizzo.projectbasic.modules.auth.services;

import br.com.guizzo.projectbasic.modules.auth.domain.dto.AuthRefreshDTO;
import br.com.guizzo.projectbasic.modules.auth.domain.dto.AuthRefreshResponseDTO;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.modules.user.repositories.UserRepository;
import br.com.guizzo.projectbasic.shared.domain.enums.PeriodExpiration;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.services.TokenSignService;
import br.com.guizzo.projectbasic.shared.services.TokenVerifyService;
import br.com.guizzo.projectbasic.shared.validators.StatusValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AuthRefreshService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenSignService tokenSignService;

    @Autowired
    private TokenVerifyService tokenVerifyService;

    @Value("${JWT_REFRESH_SECRET}")
    private String refreshSecret;

    public AuthRefreshResponseDTO execute(AuthRefreshDTO dto){

        String payload = tokenVerifyService.execute(dto.getRefreshToken(), refreshSecret);

        User user = userRepository.findFirstByEmailAndDeletedAtIsNull(payload);
        if(user == null) throw new NotFoundException("Usuário não encontrado!");

        StatusValidator.validate(user.getStatus());

        String token = tokenSignService.execute(user);
        String refreshToken = tokenSignService.execute(user, 10, PeriodExpiration.DAY, refreshSecret);

        return new AuthRefreshResponseDTO(
                user,
                token,
                refreshToken
        );

    }
}
