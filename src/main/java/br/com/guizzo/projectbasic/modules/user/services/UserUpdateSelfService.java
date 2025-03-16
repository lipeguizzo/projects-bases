package br.com.guizzo.projectbasic.modules.user.services;

import br.com.guizzo.projectbasic.modules.role.repositories.RoleRepository;
import br.com.guizzo.projectbasic.modules.user.domain.dto.UserUpdateSelfDTO;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.modules.user.repositories.UserRepository;
import br.com.guizzo.projectbasic.shared.exceptions.ConflictException;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.utils.ArrayUtil;
import br.com.guizzo.projectbasic.shared.validators.UserRoleValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserUpdateSelfService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public User execute(UserUpdateSelfDTO dto, User userRequest){

        User user = ArrayUtil.getFirstItem(
                userRepository.findByIdAndDeletedAtIsNullAndOrganizationIdAndCompanyId(
                        userRequest.getId(),
                        userRequest.getOrganization() != null ? userRequest.getOrganization().getId() : null,
                        userRequest.getCompany() != null ? userRequest.getCompany().getId()  : null
                )
        );
        if (user == null) throw new NotFoundException("Usuário não encontrado!");

        User existingUser = userRepository
                .findFirstByNameOrEmailAndDeletedAtIsNull(dto.getName(), dto.getEmail());

        if(existingUser != null && !Objects.equals(existingUser.getId(), userRequest.getId()))
            throw new ConflictException("Usuário já cadastrado!");

        if (dto.getRoleId() != null)
            UserRoleValidator.validate(dto.getRoleId(), userRequest);

        if (dto.getName() != null) user.setName(dto.getName());
        if (dto.getEmail() != null) user.setEmail(dto.getEmail());
        if (dto.getPassword() != null) user.setPassword(new BCryptPasswordEncoder().encode(dto.getPassword()));
        if (dto.getGender() != null) user.setGender(dto.getGender());
        if (dto.getPhone() != null) user.setPhone(dto.getPhone());
        if (dto.getRoleId() != null) user.setRole(roleRepository.findFirstByIdAndDeletedAtIsNull(dto.getRoleId()));
        if (dto.getStatus() != null) user.setStatus(dto.getStatus());
        
        userRepository.save(user);

        return user;
    }

}
