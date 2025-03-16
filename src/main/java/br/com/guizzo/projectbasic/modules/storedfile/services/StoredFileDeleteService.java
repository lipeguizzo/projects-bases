package br.com.guizzo.projectbasic.modules.storedfile.services;

import br.com.guizzo.projectbasic.infra.filesystem.implementations.AWSConfig;
import br.com.guizzo.projectbasic.modules.storedfile.domain.entities.StoredFile;
import br.com.guizzo.projectbasic.modules.storedfile.repositories.StoredFileRepository;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoredFileDeleteService {

    private final AWSConfig awsConfig;

    @Autowired
    public StoredFileDeleteService(AWSConfig awsConfig) {
        this.awsConfig = awsConfig;
    }

    @Autowired
    private StoredFileRepository storedFileRepository;


    public StoredFile execute(String uuid){
        StoredFile storedFile = storedFileRepository.findFirstByUuid(uuid);
        if (uuid == null) throw new NotFoundException("Arquivo não encontrado!");

        String key =  String.format("%s/%s", storedFile.getRelativePath(), storedFile.getStoredName());

        awsConfig.delete(key);

        storedFileRepository.delete(storedFile);

        return storedFile;
    }

}
