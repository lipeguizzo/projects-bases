package br.com.guizzo.projectbasic.modules.user.services;

import br.com.guizzo.projectbasic.infra.filesystem.enums.Folder;
import br.com.guizzo.projectbasic.infra.filesystem.mappers.FileMapper;
import br.com.guizzo.projectbasic.modules.storedfile.domain.dto.StoredFileCreateDTO;
import br.com.guizzo.projectbasic.modules.storedfile.domain.dto.StoredFileUpdateDTO;
import br.com.guizzo.projectbasic.modules.storedfile.domain.entities.StoredFile;
import br.com.guizzo.projectbasic.modules.storedfile.services.StoredFileCreateService;
import br.com.guizzo.projectbasic.modules.storedfile.services.StoredFileUpdateService;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.modules.user.repositories.UserRepository;
import br.com.guizzo.projectbasic.shared.exceptions.BadRequestException;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.utils.ArrayUtil;
import br.com.guizzo.projectbasic.shared.utils.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserUpdateAvatarService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StoredFileCreateService storedFileCreateService;

    @Autowired
    private StoredFileUpdateService storedFileUpdateService;

    public User execute(Long id, MultipartFile file, User userRequest) {

        User user = ArrayUtil.getFirstItem(
                userRepository.findByIdAndDeletedAtIsNullAndOrganizationIdAndCompanyId(
                        id,
                        userRequest.getOrganization() != null ? userRequest.getOrganization().getId() : null,
                        userRequest.getCompany() != null ? userRequest.getCompany().getId()  : null
                )
        );
        if (user == null) throw new NotFoundException("Usuário não encontrado!");

        try {
            StoredFile storedFile = user.getAvatar() == null ?
                    storedFileCreateService.execute(
                            FileMapper.toFileAdapter(file),
                            new StoredFileCreateDTO(
                                    file.getOriginalFilename(),
                                    file.getOriginalFilename(),
                                    FileUtil.getRelativePath(Folder.USERS, user.getId()),
                                    true
                            )) :
                    storedFileUpdateService.execute(
                        user.getAvatar().getUuid(),
                        FileMapper.toFileAdapter(file),
                            new StoredFileUpdateDTO(
                                file.getOriginalFilename(),
                                file.getOriginalFilename(),
                                user.getAvatar().getRelativePath(),
                                user.getAvatar().getIsPublic()
                    ));

            user.setAvatar(storedFile);
            userRepository.save(user);

        }catch (Exception e){
            throw new BadRequestException(e.getMessage());
        }

        return user;

    }

}
