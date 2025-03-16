package br.com.guizzo.projectbasic.modules.storedfile.repositories;

import br.com.guizzo.projectbasic.modules.storedfile.domain.entities.StoredFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoredFileRepository extends JpaRepository<StoredFile, Long> {
    StoredFile findFirstByUuid(String uuid);

    StoredFile findFirstByUuidAndIsPublic(String uuid, boolean isPublic);
}
