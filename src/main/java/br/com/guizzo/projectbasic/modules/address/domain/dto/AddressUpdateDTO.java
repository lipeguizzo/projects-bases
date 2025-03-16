package br.com.guizzo.projectbasic.modules.address.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddressUpdateDTO{
    private final String state;

    private final String city;

    private final String street;

    private final String neighborhood;

    private final String complement;
}
