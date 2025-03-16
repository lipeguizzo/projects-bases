package br.com.guizzo.projectbasic.modules.storedfile.domain.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StoredFileCreateDTO {
    @NotNull(message = "Nome inválido!")
    private String name;

    @NotNull(message = "Alternativo inválido!")
    private String alt;

    @NotNull(message = "Caminho inválido!")
    private String relativePath;

    @NotNull(message = "Valor público inválido!")
    private Boolean isPublic;

}
