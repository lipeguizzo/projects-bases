package br.com.guizzo.projectbasic.modules.role.domain.entities;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleAbilityId implements Serializable {

    private Long roleId;
    private Long abilityId;
}
