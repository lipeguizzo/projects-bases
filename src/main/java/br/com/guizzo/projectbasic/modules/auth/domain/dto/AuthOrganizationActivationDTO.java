package br.com.guizzo.projectbasic.modules.auth.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthOrganizationActivationDTO{
    private String name;
    private String url;
}
