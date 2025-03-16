package br.com.guizzo.projectbasic.modules.role.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "role_abilities")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleAbility implements Serializable {

    @EmbeddedId
    private RoleAbilityId id;

    @MapsId("roleId")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @MapsId("abilityId")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ability_id", nullable = false)
    private Ability ability;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    public String getCodeAction() { 
        return String.format("%s_%s", this.ability.getCode(), this.ability.getAction());
    }

}
