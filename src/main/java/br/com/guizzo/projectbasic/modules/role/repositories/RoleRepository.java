package br.com.guizzo.projectbasic.modules.role.repositories;

import br.com.guizzo.projectbasic.modules.role.domain.entities.Role;
import br.com.guizzo.projectbasic.modules.role.domain.enums.RoleReferences;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>, JpaSpecificationExecutor<Role> {
    Role findFirstByReference(RoleReferences reference);

    Role findFirstByIdAndDeletedAtIsNull(Long id);

    @Query("""
        SELECT r FROM Role r
        WHERE r.id = :id
        AND r.deletedAt IS NULL
        AND ((
        r.isDefault = false 
        AND (:organizationId IS NULL OR r.organization.id = :organizationId)
        AND (:companyId IS NULL OR r.company.id = :companyId))
        OR r.isDefault = true )
    """)
    List<Role> findByIdAndDeletedAtIsNullAndIsDefaultAndOrganizationAndCompany(
            @Param("id") Long id,
            @Param("organizationId") Long organizationId,
            @Param("companyId") Long companyId
    );

    @Query("""
        SELECT r FROM Role r
        WHERE r.id = :id
        AND r.deletedAt IS NULL
        AND (:organizationId IS NULL OR r.organization.id = :organizationId)
        AND (:companyId IS NULL OR r.company.id = :companyId)
    """)
    List<Role> findByIdAndDeletedAtIsNullAndOrganizationIdAndCompanyId(
            @Param("id") Long id,
            @Param("organizationId") Long organizationId,
            @Param("companyId") Long companyId
    );

    @Query("""
        SELECT r FROM Role r
        WHERE r.name LIKE CONCAT('%', :name, '%')
        AND r.deletedAt IS NULL
        AND (:organizationId IS NULL OR r.organization.id = :organizationId)
        AND (:companyId IS NULL OR r.company.id = :companyId)
    """)
    List<Role> findByNameAndDeletedAtIsNullAndOrganizationIdAndCompanyId(
            @Param("name") String name,
            @Param("organizationId") Long organizationId,
            @Param("companyId") Long companyId
    );

    List<Role> findByNameAndDeletedAtIsNull(String name);

    Boolean existsByOrganizationIdAndDeletedAtIsNull(Long organizationId);

    Boolean existsByCompanyIdAndDeletedAtIsNull(Long companyId);
}
