package br.com.guizzo.projectbasic.modules.user.domain.dto;

import br.com.guizzo.projectbasic.shared.domain.enums.Status;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserUpdateStatusDTO {

    @NotNull(message = "Status inválido!")
    private Status status;
}
