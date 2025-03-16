package br.com.guizzo.projectbasic.modules.user.services;

import br.com.guizzo.projectbasic.modules.company.repositories.CompanyRepository;
import br.com.guizzo.projectbasic.modules.organization.repositories.OrganizationRepository;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleRepository;
import br.com.guizzo.projectbasic.modules.user.domain.dto.UserCreateDTO;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.modules.user.repositories.UserRepository;
import br.com.guizzo.projectbasic.shared.exceptions.ConflictException;
import br.com.guizzo.projectbasic.shared.utils.ArrayUtil;
import br.com.guizzo.projectbasic.shared.validators.UserCompanyValidator;
import br.com.guizzo.projectbasic.shared.validators.UserOrganizationValidator;
import br.com.guizzo.projectbasic.shared.validators.UserRoleValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserCreateService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private RoleRepository roleRepository;

    public User execute(UserCreateDTO dto, User userRequest){

        User user = ArrayUtil.getFirstItem(
                userRepository.findByNameOrEmailAndDeletedAtIsNullAndOrganizationIdAndCompanyId(
                        dto.getName(),
                        dto.getEmail(),
                        dto.getOrganizationId() != null ? dto.getOrganizationId() : null,
                        dto.getCompanyId() != null ? dto.getCompanyId() : null
                )
        );

        if(user != null) throw new ConflictException("Nome ou e-mail de usuário já cadastrado!");

        if(dto.getOrganizationId() != null)
            UserOrganizationValidator.validate(dto.getOrganizationId(), userRequest);

        if(dto.getCompanyId() != null)
            UserCompanyValidator.validate(dto.getCompanyId(), userRequest);

        if(dto.getRoleId() != null)
            UserRoleValidator.validate(dto.getRoleId(), userRequest);

        User createdUser = userRepository.save(User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(new BCryptPasswordEncoder().encode(dto.getPassword()))
                .gender(dto.getGender())
                .phone(dto.getPhone())
                .role(dto.getRoleId() != null ?
                        roleRepository.findFirstByIdAndDeletedAtIsNull(dto.getRoleId()) : null)
                .organization(dto.getOrganizationId() != null ?
                        organizationRepository.findFirstByIdAndDeletedAtIsNull(dto.getOrganizationId()) : null)
                .company(dto.getCompanyId() != null ?
                        companyRepository.findFirstByIdAndDeletedAtIsNull(dto.getCompanyId()) : null)
                .status(dto.getStatus())
                .build()
        );

        return createdUser;
    }

}
