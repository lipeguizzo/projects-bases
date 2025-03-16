package br.com.guizzo.projectbasic.modules.storedfile.services;

import br.com.guizzo.projectbasic.infra.filesystem.adapters.FileAdapter;
import br.com.guizzo.projectbasic.infra.filesystem.implementations.AWSConfig;
import br.com.guizzo.projectbasic.modules.storedfile.domain.dto.StoredFileUpdateDTO;
import br.com.guizzo.projectbasic.modules.storedfile.domain.entities.StoredFile;
import br.com.guizzo.projectbasic.modules.storedfile.repositories.StoredFileRepository;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import br.com.guizzo.projectbasic.shared.utils.FileUtil;
import br.com.guizzo.projectbasic.shared.utils.HashUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoredFileUpdateService {

    private final AWSConfig awsConfig;

    @Autowired
    public StoredFileUpdateService(AWSConfig awsConfig) {
        this.awsConfig = awsConfig;
    }

    @Autowired
    private StoredFileRepository storedFileRepository;


    public StoredFile execute(String uuid, FileAdapter file, StoredFileUpdateDTO dto){
        StoredFile storedFile = storedFileRepository.findFirstByUuid(uuid);
        if (uuid == null) throw new NotFoundException("Arquivo não encontrado!");

        String storedName = FileUtil.generateFileName(dto.getName().isEmpty() ? file.getName() : dto.getName());

        awsConfig.put(new FileAdapter(
                storedName,
                dto.getRelativePath(),
                file.getContent(),
                file.getLength(),
                file.getContentType(),
                file.getBytes()
        ));

        storedFile.setAlt(dto.getAlt());
        storedFile.setChecksum(HashUtil.hashMd5(file.getBytes()));
        storedFile.setOriginalName(file.getName());
        storedFile.setStoredName(storedName);
        storedFile.setRelativePath(dto.getRelativePath());
        storedFile.setContentType(file.getContentType());
        storedFile.setIsPublic(dto.getIsPublic());

        storedFileRepository.save(storedFile);

        return storedFile;
    }

}
