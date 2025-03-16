package br.com.guizzo.projectbasic.modules.organization.services;

import br.com.guizzo.projectbasic.infra.filesystem.enums.Folder;
import br.com.guizzo.projectbasic.infra.filesystem.mappers.FileMapper;
import br.com.guizzo.projectbasic.modules.organization.domain.entities.Organization;
import br.com.guizzo.projectbasic.modules.organization.repositories.OrganizationRepository;
import br.com.guizzo.projectbasic.modules.storedfile.domain.dto.StoredFileCreateDTO;
import br.com.guizzo.projectbasic.modules.storedfile.domain.dto.StoredFileUpdateDTO;
import br.com.guizzo.projectbasic.modules.storedfile.domain.entities.StoredFile;
import br.com.guizzo.projectbasic.modules.storedfile.services.StoredFileCreateService;
import br.com.guizzo.projectbasic.modules.storedfile.services.StoredFileUpdateService;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.BadRequestException;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.utils.FileUtil;
import br.com.guizzo.projectbasic.shared.validators.UserOrganizationValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class OrganizationUpdateAvatarService {

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private StoredFileCreateService storedFileCreateService;

    @Autowired
    private StoredFileUpdateService storedFileUpdateService;

    public Organization execute(Long id, MultipartFile file, User userRequest) {

        Organization organization = organizationRepository.findFirstByIdAndDeletedAtIsNull(id);
        if (organization == null) throw new NotFoundException("Organização não encontrada!");

        UserOrganizationValidator.validate(id, userRequest);

        try {
            StoredFile storedFile = organization.getAvatar() == null ?
                    storedFileCreateService.execute(
                            FileMapper.toFileAdapter(file),
                            new StoredFileCreateDTO(
                                    file.getOriginalFilename(),
                                    file.getOriginalFilename(),
                                    FileUtil.getRelativePath(Folder.ORGANIZATIONS, organization.getId()),
                                    true
                            )) :
                    storedFileUpdateService.execute(
                        organization.getAvatar().getUuid(),
                        FileMapper.toFileAdapter(file),
                            new StoredFileUpdateDTO(
                                file.getOriginalFilename(),
                                file.getOriginalFilename(),
                                organization.getAvatar().getRelativePath(),
                                organization.getAvatar().getIsPublic()
                    ));

            organization.setAvatar(storedFile);
            organizationRepository.save(organization);

        }catch (Exception e){
            throw new BadRequestException(e.getMessage());
        }

        return organization;

    }

}
