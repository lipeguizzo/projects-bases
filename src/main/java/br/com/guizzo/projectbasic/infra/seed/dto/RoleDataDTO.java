package br.com.guizzo.projectbasic.infra.seed.dto;


import br.com.guizzo.projectbasic.modules.role.domain.enums.RoleReferences;

public record RoleDataDTO(String name, RoleReferences reference) {}
