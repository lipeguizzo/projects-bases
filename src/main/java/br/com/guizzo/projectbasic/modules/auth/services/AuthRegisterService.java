package br.com.guizzo.projectbasic.modules.auth.services;

import br.com.guizzo.projectbasic.modules.address.domain.entities.Address;
import br.com.guizzo.projectbasic.modules.address.repositories.AddressRepository;
import br.com.guizzo.projectbasic.modules.auth.domain.dto.AuthRegisterDTO;
import br.com.guizzo.projectbasic.modules.auth.domain.dto.AuthOrganizationActivationDTO;
import br.com.guizzo.projectbasic.modules.mail.domain.dto.MailOptionDTO;
import br.com.guizzo.projectbasic.modules.mail.domain.enums.MailTemplate;
import br.com.guizzo.projectbasic.modules.mail.services.MailSendService;
import br.com.guizzo.projectbasic.modules.organization.domain.entities.Organization;
import br.com.guizzo.projectbasic.modules.organization.repositories.OrganizationRepository;
import br.com.guizzo.projectbasic.modules.role.domain.enums.RoleReferences;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleRepository;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.modules.user.repositories.UserRepository;
import br.com.guizzo.projectbasic.shared.domain.enums.Status;
import br.com.guizzo.projectbasic.shared.exceptions.ConflictException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthRegisterService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private MailSendService mailSendService;

    @Value("${ADMIN_EMAIL}")
    private String adminEmail;


    @Value("${FRONT_END_URL}")
    private String url;

    public User execute(AuthRegisterDTO dto) {

        boolean isAdminOrganization = dto.getReference() == RoleReferences.ADMIN_ORGANIZATION;

        User user = userRepository.findFirstByNameOrEmailAndDeletedAtIsNull(dto.getName(), dto.getEmail());
        if(user != null) throw new ConflictException("Nome ou e-mail de usuário já cadastrado!");

        if(isAdminOrganization){
            Organization organization = organizationRepository
                    .findFirstByNameOrEmailAndDeletedAtIsNull(dto.getOrganizationName(), dto.getOrganizationEmail());
            if(organization != null) throw new ConflictException("Nome ou e-mail da organização já cadastrado!");
        }

        User createdUser =  userRepository.save(
                User.builder()
                        .name(dto.getName())
                        .email(dto.getEmail())
                        .password(new BCryptPasswordEncoder().encode(dto.getPassword()))
                        .gender(dto.getGender())
                        .phone(dto.getPhone())
                        .status(isAdminOrganization ? Status.WAITING: Status.ACTIVE)
                        .role(roleRepository.findById(isAdminOrganization ? 2L : 4L).get())
                        .organization(isAdminOrganization ? organizationRepository.save(Organization.builder()
                                .name(dto.getOrganizationName())
                                .tradeName(dto.getOrganizationTradeName())
                                .email(dto.getOrganizationEmail())
                                .status(Status.WAITING)
                                .address(addressRepository.save(Address.builder()
                                        .state(dto.getAddress().getState())
                                        .city(dto.getAddress().getCity())
                                        .street(dto.getAddress().getStreet())
                                        .neighborhood(dto.getAddress().getNeighborhood())
                                        .complement(dto.getAddress().getComplement())
                                        .build()))
                                .build()) : null)
                        .build()
        );

        if(isAdminOrganization){
            mailSendService.execute(
                    new MailOptionDTO(
                            List.of(adminEmail).toArray(String[]::new),
                            "Cadastro de organização:",
                            MailTemplate.ORGANIZATION_ACTIVATION,
                            new AuthOrganizationActivationDTO(
                                    createdUser.getOrganization().getName(),
                                    url
                            ),
                            null
                    )
            );
        }

        return createdUser;
    }
}
