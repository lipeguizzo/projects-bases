package br.com.guizzo.projectbasic.modules.company.services;

import br.com.guizzo.projectbasic.infra.filesystem.enums.Folder;
import br.com.guizzo.projectbasic.infra.filesystem.mappers.FileMapper;
import br.com.guizzo.projectbasic.modules.company.domain.entities.Company;
import br.com.guizzo.projectbasic.modules.company.repositories.CompanyRepository;
import br.com.guizzo.projectbasic.modules.storedfile.domain.dto.StoredFileCreateDTO;
import br.com.guizzo.projectbasic.modules.storedfile.domain.dto.StoredFileUpdateDTO;
import br.com.guizzo.projectbasic.modules.storedfile.domain.entities.StoredFile;
import br.com.guizzo.projectbasic.modules.storedfile.services.StoredFileCreateService;
import br.com.guizzo.projectbasic.modules.storedfile.services.StoredFileUpdateService;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.BadRequestException;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.utils.FileUtil;
import br.com.guizzo.projectbasic.shared.validators.UserCompanyValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CompanyUpdateAvatarService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private StoredFileCreateService storedFileCreateService;

    @Autowired
    private StoredFileUpdateService storedFileUpdateService;

    public Company execute(Long id, MultipartFile file, User userRequest) {

        Company company = companyRepository.findFirstByIdAndDeletedAtIsNull(id);
        if (company == null) throw new NotFoundException("Empresa não encontrada!");

        UserCompanyValidator.validate(id, userRequest);

        try {
            StoredFile storedFile = company.getAvatar() == null ?
                    storedFileCreateService.execute(
                            FileMapper.toFileAdapter(file),
                            new StoredFileCreateDTO(
                                    file.getOriginalFilename(),
                                    file.getOriginalFilename(),
                                    FileUtil.getRelativePath(Folder.COMPANIES, company.getId()),
                                    true
                            )) :
                    storedFileUpdateService.execute(
                        company.getAvatar().getUuid(),
                        FileMapper.toFileAdapter(file),
                            new StoredFileUpdateDTO(
                                file.getOriginalFilename(),
                                file.getOriginalFilename(),
                                company.getAvatar().getRelativePath(),
                                company.getAvatar().getIsPublic()
                    ));

            company.setAvatar(storedFile);
            companyRepository.save(company);

        }catch (Exception e){
            throw new BadRequestException(e.getMessage());
        }

        return company;

    }

}
