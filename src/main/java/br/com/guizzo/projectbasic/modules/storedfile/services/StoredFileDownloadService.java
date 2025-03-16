package br.com.guizzo.projectbasic.modules.storedfile.services;

import br.com.guizzo.projectbasic.infra.filesystem.adapters.FileAdapter;
import br.com.guizzo.projectbasic.infra.filesystem.implementations.AWSConfig;
import br.com.guizzo.projectbasic.modules.storedfile.domain.entities.StoredFile;
import br.com.guizzo.projectbasic.modules.storedfile.repositories.StoredFileRepository;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoredFileDownloadService {

    private final AWSConfig awsConfig;

    @Autowired
    public StoredFileDownloadService(AWSConfig awsConfig) {
        this.awsConfig = awsConfig;
    }

    @Autowired
    private StoredFileRepository storedFileRepository;

    public FileAdapter execute(String uuid, Boolean isPublic){
        StoredFile storedFile = storedFileRepository.findFirstByUuidAndIsPublic(uuid, isPublic);
        if (storedFile == null) throw new NotFoundException("Arquivo não encontrado!");

        return awsConfig.get(storedFile.getRelativePath(), storedFile.getStoredName());

    }

}
