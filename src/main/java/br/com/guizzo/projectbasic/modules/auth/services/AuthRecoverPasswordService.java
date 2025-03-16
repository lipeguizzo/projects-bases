package br.com.guizzo.projectbasic.modules.auth.services;

import br.com.guizzo.projectbasic.modules.auth.domain.dto.AuthRecoverPasswordDTO;
import br.com.guizzo.projectbasic.modules.auth.domain.dto.AuthRecoverPasswordResponseDTO;
import br.com.guizzo.projectbasic.modules.mail.domain.dto.MailOptionDTO;
import br.com.guizzo.projectbasic.modules.mail.domain.enums.MailTemplate;
import br.com.guizzo.projectbasic.modules.mail.services.MailSendService;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.modules.user.repositories.UserRepository;
import br.com.guizzo.projectbasic.shared.domain.enums.PeriodExpiration;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.services.TokenSignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthRecoverPasswordService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MailSendService mailSendService;

    @Autowired
    private TokenSignService tokenSignService;

    @Value("${JWT_SECRET}")
    private String secret;

    @Value("${FRONT_END_URL}")
    private String url;

    public AuthRecoverPasswordResponseDTO execute(br.com.guizzo.projectbasic.modules.auth.domain.dto.AuthRecoverPasswordDTO dto){

        User user = userRepository.findFirstByEmailAndDeletedAtIsNull(dto.getEmail());
        if(user == null) throw new NotFoundException("Usuário não encontrado!");

        String token = tokenSignService.execute(user, 10, PeriodExpiration.MINUTE, this.secret);
        String url = this.url + "/recuperar-senha/nova-senha?token=" + token;

        mailSendService.execute(
                new MailOptionDTO(
                        List.of(dto.getEmail()).toArray(String[]::new),
                        "Recuperação de Senha:",
                        MailTemplate.RECOVER_PASSWORD,
                        new AuthRecoverPasswordDTO(
                                user.getName(),
                                url
                        ),
                        null
                )
        );

        return new AuthRecoverPasswordResponseDTO (
                "E-mail enviado com sucesso!"
        );

    }
}
