package br.com.guizzo.projectbasic.modules.address.domain.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddressCreateDTO{
        @NotNull(message = "Estado inválido!")
        private final String state;

        @NotNull(message = "Cidade inválida!")
        private final String city;

        @NotNull(message = "Logradouro inválido!")
        private final String street;

        @NotNull(message = "Bairro inválido!")
        private final String neighborhood;

        private final String complement;
}