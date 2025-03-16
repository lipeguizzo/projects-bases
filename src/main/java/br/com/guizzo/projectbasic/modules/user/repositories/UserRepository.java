package br.com.guizzo.projectbasic.modules.user.repositories;

import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    User findFirstByIdAndDeletedAtIsNull(Long id);

    User findFirstByEmailAndDeletedAtIsNull(String email);

    User findFirstByNameOrEmailAndDeletedAtIsNull(String name, String email);

    @Query("""
        SELECT u FROM User u
        WHERE u.id = :id
        AND u.deletedAt IS NULL
        AND (:organizationId IS NULL OR u.organization.id = :organizationId)
        AND (:companyId IS NULL OR u.company.id = :companyId)
    """)
    List<User> findByIdAndDeletedAtIsNullAndOrganizationIdAndCompanyId(
            @Param("id") Long id,
            @Param("organizationId") Long organizationId,
            @Param("companyId") Long companyId
    );

    @Query("""
        SELECT u FROM User u
        WHERE (u.name LIKE CONCAT('%', :name, '%') OR u.email LIKE CONCAT('%', :email, '%'))
        AND u.deletedAt IS NULL
        AND (:organizationId IS NULL OR u.organization.id = :organizationId)
        AND (:companyId IS NULL OR u.company.id = :companyId)
    """)
    List<User> findByNameOrEmailAndDeletedAtIsNullAndOrganizationIdAndCompanyId(
            @Param("name") String name,
            @Param("email") String email,
            @Param("organizationId") Long organizationId,
            @Param("companyId") Long companyId
    );

    Boolean existsByOrganizationIdAndDeletedAtIsNull(Long organizationId);

    Boolean existsByCompanyIdAndDeletedAtIsNull(Long companyId);

    Boolean existsByRoleIdAndDeletedAtIsNull(Long roleId);
}
