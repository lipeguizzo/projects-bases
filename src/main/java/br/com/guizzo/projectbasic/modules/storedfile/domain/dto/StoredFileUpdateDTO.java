package br.com.guizzo.projectbasic.modules.storedfile.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StoredFileUpdateDTO {
    private String name;

    private String alt;

    private String relativePath;

    private Boolean isPublic;

}
