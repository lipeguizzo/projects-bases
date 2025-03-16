package br.com.guizzo.projectbasic.modules.user.domain.entities;


import br.com.guizzo.projectbasic.modules.company.domain.entities.Company;
import br.com.guizzo.projectbasic.modules.organization.domain.entities.Organization;
import br.com.guizzo.projectbasic.modules.role.domain.entities.Role;
import br.com.guizzo.projectbasic.modules.storedfile.domain.entities.StoredFile;
import br.com.guizzo.projectbasic.modules.user.domain.enums.UserGender;
import br.com.guizzo.projectbasic.shared.domain.enums.Status;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails, Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, length=100, unique = true)
    private String name;

    @Column(nullable=false, length=100, unique = true)
    private String email;

    @Column(nullable=false, length=200, unique = true)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private UserGender gender;

    @Column(nullable=false, length=20)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private Status status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "organization_id", nullable = true)
    private Organization organization;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id", nullable = true)
    private Company company;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "avatar_id", nullable = true)
    private StoredFile avatar;

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
        createdAt = new Date();
        updatedAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }

    public void softDelete() {
        this.deletedAt = new Date();
    }

    public boolean isDeleted() {
        return this.deletedAt != null;
    }

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        List<GrantedAuthority> authorities = new ArrayList<>();

        this.role.getRoleAbilities().stream()
                .map(roleAbility -> new SimpleGrantedAuthority(
                        roleAbility.getCodeAction()))
                .forEach(authorities::add);

        return authorities;
    }


    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.status == Status.ACTIVE;
    }

}
