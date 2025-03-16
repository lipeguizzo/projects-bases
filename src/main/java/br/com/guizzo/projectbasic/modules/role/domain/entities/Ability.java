package br.com.guizzo.projectbasic.modules.role.domain.entities;

import br.com.guizzo.projectbasic.modules.role.domain.enums.AbilityActions;
import br.com.guizzo.projectbasic.modules.role.domain.enums.AbilityCodes;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "abilities")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ability implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AbilityCodes code;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AbilityActions action;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "deleted_at")
    private Date deletedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

    public void softDelete() {
        this.deletedAt = new Date();
    }

    public boolean isDeleted() {
        return this.deletedAt != null;
    }

}

