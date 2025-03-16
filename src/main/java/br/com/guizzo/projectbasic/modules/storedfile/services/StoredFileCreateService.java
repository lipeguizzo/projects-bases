package br.com.guizzo.projectbasic.modules.storedfile.services;

import br.com.guizzo.projectbasic.infra.filesystem.adapters.FileAdapter;
import br.com.guizzo.projectbasic.infra.filesystem.implementations.AWSConfig;
import br.com.guizzo.projectbasic.modules.storedfile.domain.dto.StoredFileCreateDTO;
import br.com.guizzo.projectbasic.modules.storedfile.domain.entities.StoredFile;
import br.com.guizzo.projectbasic.modules.storedfile.repositories.StoredFileRepository;
import br.com.guizzo.projectbasic.shared.utils.FileUtil;
import br.com.guizzo.projectbasic.shared.utils.HashUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoredFileCreateService {

    private final AWSConfig awsConfig;

    @Autowired
    public StoredFileCreateService (AWSConfig awsConfig) {
        this.awsConfig = awsConfig;
    }

    @Autowired
    private StoredFileRepository storedFileRepository;

    public StoredFile execute(FileAdapter file, StoredFileCreateDTO dto){
        String storedName = FileUtil.generateFileName(dto.getName() != null ? dto.getName() : file.getName());

        awsConfig.put(new FileAdapter(
                storedName,
                dto.getRelativePath(),
                file.getContent(),
                file.getLength(),
                file.getContentType(),
                file.getBytes()
        ));

        StoredFile createdFile = storedFileRepository.save(StoredFile.builder()
                .alt(dto.getAlt())
                .checksum(HashUtil.hashMd5(file.getBytes()))
                .originalName(file.getName())
                .storedName(storedName)
                .relativePath(dto.getRelativePath())
                .contentType(file.getContentType())
                .isPublic(dto.getIsPublic())
                .build()
        );

        return createdFile;
    }

}
