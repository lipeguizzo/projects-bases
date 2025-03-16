package br.com.guizzo.projectbasic.modules.user.services;

import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.modules.user.repositories.UserRepository;
import br.com.guizzo.projectbasic.modules.user.validators.UserDeleteValidator;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.utils.ArrayUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserDeleteService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDeleteAvatarService userDeleteAvatarService ;

    public User execute(Long id, User userRequest){

        User user = ArrayUtil.getFirstItem(
                userRepository.findByIdAndDeletedAtIsNullAndOrganizationIdAndCompanyId(
                        id,
                        userRequest.getOrganization() != null ? userRequest.getOrganization().getId() : null,
                        userRequest.getCompany() != null ? userRequest.getCompany().getId()  : null
                )
        );
        if (user == null) throw new NotFoundException("Usuário não encontrado!");

        UserDeleteValidator.validate(id);

        if (user.getAvatar() != null){
            userDeleteAvatarService.execute(id, userRequest);
            user.setAvatar(null);
        }

        user.softDelete();
        userRepository.save(user);

        return user;
    }

}
